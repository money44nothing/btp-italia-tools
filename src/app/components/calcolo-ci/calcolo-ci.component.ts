import { Component, OnInit } from '@angular/core';
import { endOfMonth, getDate, getYear, isAfter } from 'date-fns';
import { BtpItaliaService } from '../../services/btp-italia/btp-italia.service';
import { BtpItalia } from '../../services/btp-italia/BtpItalia';
import { MONTH_NAMES } from '../../utils/dates';
import { CoefficienteInflazione, coefficienteInflazioneByDate } from '../../utils/foi/foi';
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

  constructor(
    private btpItaliaService: BtpItaliaService,
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

  onChange($event: Event): void {
    this.showCIList();
  }

  private showCIList(): void {
    if (this.btp.selected != null && this.month.selected != null && this.year.selected != null) {
      const endDay = endOfMonth(new Date(this.year.selected, this.month.selected, 1));
      const baseDate = this.btp.selected.dataInizioNegoziazione;
      const arr: CoefficienteInflazione[] = [];
      for (let i = 1; i <= getDate(endDay); i++) {
        const date = new Date(this.year.selected, this.month.selected, i);
        if (isAfter(baseDate, date)) {
          continue;
        }
        const value = coefficienteInflazioneByDate(date, baseDate);
        if (value != null) {
          arr.push({ date, value });
        }
      }
      this.ciList = arr;
    }
  }
}
