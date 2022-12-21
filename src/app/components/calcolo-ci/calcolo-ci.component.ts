import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getYear } from 'date-fns';
import { BtpItaliaService } from '../../services/btp-italia/btp-italia.service';
import { BtpItalia } from '../../services/btp-italia/BtpItalia';
import { ExportFOIService } from '../../services/foi/export-foi.service';
import { MONTH_NAMES } from '../../utils/dates';
import { CoefficienteInflazione } from '../../utils/foi/coefficienteInflazioneTypes';
import { getCoefficientiMensili, getDataUltimaCedola } from '../../utils/foi/coefficienti';
import { emptyListSelection } from '../../utils/selection/selection';

@Component({
  selector: 'app-calcolo-ci',
  templateUrl: './calcolo-ci.component.html',
  styleUrls: ['./calcolo-ci.component.scss']
})
export class CalcoloCIComponent implements OnInit {
  btp = emptyListSelection<BtpItalia, BtpItalia>();
  month = emptyListSelection<string, number>(MONTH_NAMES);
  year = emptyListSelection<number>();
  ciList: CoefficienteInflazione[] = [];
  baseDate?: Date;

  constructor(
    private btpItaliaService: BtpItaliaService,
    private exportService: ExportFOIService,
  ) {}

  ngOnInit(): void {
    this.btpItaliaService.list()
      .subscribe(list => {
        this.btp.list = list;

        const arr: number[] = [];

        const currYear = getYear(new Date()) + 1;
        for (let i = getYear(this.btp.list[0].dataInizioNegoziazione); i <= currYear; i++) {
          arr.push(i);
        }
        this.year.list = arr;
      });
  }

  onChange(_$event: Event): void {
    this.showCIList();
  }

  private showCIList(): void {
    if (this.btp.selected != null && this.month.selected != null && this.year.selected != null) {
      this.baseDate = getDataUltimaCedola(this.btp.selected.dataInizioNegoziazione, this.year.selected, this.month.selected);
      this.ciList = getCoefficientiMensili(
        {
          baseDate: this.baseDate,
          firstDayOfTrading: this.btp.selected.dataInizioNegoziazione,
          year: this.year.selected,
          month: this.month.selected
        });
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

}
