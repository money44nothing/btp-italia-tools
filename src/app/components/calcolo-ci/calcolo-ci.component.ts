import { Component, OnInit } from '@angular/core';
import { MONTH_NAMES } from '../../utils/dates';
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
  month = emptyListSelection(MONTH_NAMES);
  year = emptyListSelection<number>();

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
    if (this.btp.selected !== null && this.month.selected !== null && this.year.selected !== null) {
      // empty
    }
  }
}
