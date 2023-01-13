import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getYear } from 'date-fns';
import { forkJoin } from 'rxjs';
import { BtpItaliaService } from '../../../services/btp-italia/btp-italia.service';
import { BtpItalia } from '../../../services/btp-italia/BtpItalia';
import { ExportFOIService } from '../../../services/foi/export-foi.service';
import { FoiService } from '../../../services/foi/foi.service';
import { MONTH_NAMES } from '../../../utils/dates';
import { CoefficienteInflazioneMensile } from '../../../utils/foi/coefficienteInflazioneTypes';
import { getCoefficienteMensile, getDataUltimaCedola } from '../../../utils/foi/coefficienti';
import { FoiExTabacchi } from '../../../utils/foi/foiTypes';
import { emptyListSelection } from '../../../utils/selection/selection';

@Component({
  selector: 'app-list-ci',
  templateUrl: './ci-list.component.html',
  styleUrls: ['./ci-list.component.scss']
})
export class CiListComponent implements OnInit {
  btp = emptyListSelection<BtpItalia, BtpItalia>();
  month = emptyListSelection<string, number>(MONTH_NAMES);
  year = emptyListSelection<number, number>();
  ciMensile?: CoefficienteInflazioneMensile | null;
  baseDate?: Date;
  foiList: readonly FoiExTabacchi[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private btpItaliaService: BtpItaliaService,
    private foiService: FoiService,
    private exportService: ExportFOIService,
  ) {}

  ngOnInit(): void {
    forkJoin([this.foiService.listFoi(), this.btpItaliaService.list()])
      .subscribe(v => {
        const [foiList, btpItaliaList] = v;
        this.foiList = foiList;
        this.btp.list = btpItaliaList;
        this.year.list = this.yearsFromDataInizioNegoziazione();
        const params = this.activatedRoute.snapshot.queryParamMap;
        this.setup(params.get('isin'), Number(params.get('year')), Number(params.get('month')));
      });
  }

  private yearsFromDataInizioNegoziazione(): number[] {
    const arr: number[] = [];

    const currYear = getYear(new Date()) + 1;
    for (let i = getYear(this.btp.list[0].dataInizioNegoziazione); i <= currYear; i++) {
      arr.push(i);
    }
    return arr;
  }

  onChange(_$event: Event): void {
    this.showCIList();
  }

  private showCIList(): void {
    this.ciMensile = null;
    if (this.btp.selected != null && this.month.selected != null && this.year.selected != null) {
      this.baseDate = getDataUltimaCedola(this.btp.selected.dataInizioNegoziazione, this.year.selected, this.month.selected);
      this.ciMensile = getCoefficienteMensile(
        this.foiList,
        {
          baseDate: this.baseDate,
          firstDayOfTrading: this.btp.selected.dataInizioNegoziazione,
          year: this.year.selected,
          month: this.month.selected
        });
    }
  }

  export(): void {
    const ci = this.ciMensile;

    if (!ci) {
      return;
    }
    if (this.btp.selected != null && this.month.selected != null && this.year.selected != null && ci.days.length > 0) {
      const strMonth = formatNumber(this.month.selected + 1, 'it', '2.0');
      this.exportService.exportCoefficienti({
        ciMensile: ci,
        sheetTitle: `CI ${this.btp.selected.isin} ${this.year.selected}-${strMonth}`,
        fileName: `CI-${this.btp.selected.isin}-${this.year.selected}-${strMonth}`
      });
    }
  }

  private setup(isin: string | null, year: number, month: number): void {
    const now = new Date();
    const selBtp = isin == null ? null : this.btpItaliaService.findByIsin(this.btp.list, isin);
    this.year.selected = this.year.list.find(v => v === year) ?? now.getFullYear();
    this.month.selected = 1 <= month && month <= 12 ? month - 1 : now.getMonth();

    if (selBtp != null) {
      this.btp.selected = selBtp;
      this.showCIList();
    }
  }
}
