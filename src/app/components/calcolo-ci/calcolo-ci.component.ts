import { Component, OnInit } from '@angular/core';
import { endOfMonth, getDate } from 'date-fns';
import { MONTH_NAMES } from '../../utils/dates';
import { CoefficienteInflazione, coefficienteInflazioneByDate } from '../../utils/foi/foi';
import { emptyListSelection } from '../../utils/selection/selection';
import { BtpItaliaService } from '../../services/btp-italia/btp-italia.service';
import { BtpItalia } from '../../services/btp-italia/BtpItalia';

@Component({
  selector: 'app-calcolo-ci',
  templateUrl: './calcolo-ci.component.html',
  styleUrls: ['./calcolo-ci.component.scss']
})
export class CalcoloCIComponent implements OnInit {
  btp = emptyListSelection<BtpItalia>();
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
        this.year.list = Array
          .from(new Set(this.btp.list.map(b => b.dataInizioNegoziazione.getFullYear())).values())
          .sort((l, r) => l < r ? -1 : l > r ? 1 : 0);
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
        const value = coefficienteInflazioneByDate(date, baseDate);
        if (value != null) {
          arr.push({ date, value });
        }
      }
      this.ciList = arr;
    }
  }
}
