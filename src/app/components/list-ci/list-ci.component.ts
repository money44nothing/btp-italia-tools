import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { compareAsc, getYear } from 'date-fns';
import { forkJoin } from 'rxjs';
import { BtpItaliaService } from '../../services/btp-italia/btp-italia.service';
import { BtpItalia } from '../../services/btp-italia/BtpItalia';
import { ExportFOIService } from '../../services/foi/export-foi.service';
import { FoiService } from '../../services/foi/foi.service';
import { MONTH_NAMES } from '../../utils/dates';
import { CoefficienteInflazione } from '../../utils/foi/coefficienteInflazioneTypes';
import { getCoefficienteMensile, getDataUltimaCedola } from '../../utils/foi/coefficienti';
import { FoiExTabacchi } from '../../utils/foi/foiTypes';
import { emptyListSelection } from '../../utils/selection/selection';

@Component({
  selector: 'app-list-ci',
  templateUrl: './list-ci.component.html',
  styleUrls: ['./list-ci.component.scss']
})
export class ListCiComponent implements OnInit {
  btp = emptyListSelection<BtpItalia, BtpItalia>();
  month = emptyListSelection<string, number>(MONTH_NAMES);
  year = emptyListSelection<number>();
  ciList: CoefficienteInflazione[] = [];
  indexBaseDateChange = -1;
  baseDate?: Date;
  permalinkPath = '';
  foiList: readonly FoiExTabacchi[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private btpItaliaService: BtpItaliaService,
    private foiService: FoiService,
    private exportService: ExportFOIService,
  ) {}

  ngOnInit(): void {
    this.permalinkPath = location.pathname;

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
    this.ciList = [];
    if (this.btp.selected != null && this.month.selected != null && this.year.selected != null) {
      this.baseDate = getDataUltimaCedola(this.btp.selected.dataInizioNegoziazione, this.year.selected, this.month.selected);
      this.ciList = getCoefficienteMensile(
        this.foiList,
        {
          baseDate: this.baseDate,
          firstDayOfTrading: this.btp.selected.dataInizioNegoziazione,
          year: this.year.selected,
          month: this.month.selected
        });
      this.indexBaseDateChange = this.ciList.findIndex((el, i, arr) => i > 0 ? compareAsc(el.baseDate, arr[i - 1].baseDate) !== 0 : false);
    }
  }

  export(): void {
    if (this.btp.selected != null && this.month.selected != null && this.year.selected != null && this.ciList.length > 0) {
      const strMonth = formatNumber(this.month.selected + 1, 'it', '2.0');
      this.exportService.exportCoefficienti({
        list: this.ciList,
        sheetTitle: `CI ${this.btp.selected.isin} ${this.year.selected}-${strMonth}`,
        fileName: `CI-${this.btp.selected.isin}-${this.year.selected}-${strMonth}`
      });
    }
  }

  private setup(isin: string | null, year: number, month: number): void {
    const selBtp = isin == null ? null : this.btpItaliaService.findByIsin(this.btp.list, isin);
    const selYear = this.year.list.find(v => v === year);
    const selMonth = 1 <= month && month <= 12 ? month : undefined;

    if (selBtp != null && selYear != null && selMonth != null) {
      this.btp.selected = selBtp;
      this.year.selected = selYear;
      this.month.selected = selMonth - 1;
      this.showCIList();
    }
  }

  baseDateClass(index: number): Record<string, boolean> {
    const isBaseChanged = index === this.indexBaseDateChange;
    return {
      'text-danger': isBaseChanged,
      'base-changed': isBaseChanged,
    };
  }

  baseDateNoteStyle(): Record<string, string> {
    const isBaseChanged = this.indexBaseDateChange >= 0;
    return {
      visibility: isBaseChanged ? 'visible' : 'collapse',
    };
  }
}
