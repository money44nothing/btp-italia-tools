import { Component } from '@angular/core';
import { MONTH_NAMES } from '../../utils/dates';
import { exportFoi } from '../../utils/foi/export';
import { FOI_EX_TABACCHI } from '../../utils/foi/foi';
import { FoiExTabacchi } from '../../utils/foi/foiTypes';

type FoiDesc = FoiExTabacchi & { monthName: string };

@Component({
  selector: 'app-foi-ex-tabacchi',
  templateUrl: './foi-ex-tabacchi.component.html',
  styleUrls: ['./foi-ex-tabacchi.component.scss']
})
export class FoiExTabacchiComponent {
  foi: FoiDesc[] = FOI_EX_TABACCHI.map(foi => ({
    ...foi,
    monthName: MONTH_NAMES[foi.month - 1],
  }));

  foiList: FoiDesc[] = [];
  years = new Set(FOI_EX_TABACCHI.map(foi => foi.year));
  private mCurrentYear = 0;
  get currentYear(): number {
    return this.mCurrentYear;
  }
  set currentYear(v: number) {
    this.mCurrentYear = v;
    this.foiList = this.foi.filter(foi => foi.year === this.mCurrentYear);
  }

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  isCurrentYear(y: number): boolean {
    return y === this.currentYear;
  }

  export(): void {
    const fileName = `FOI-${this.currentYear}`;
    exportFoi(this.foiList, fileName);
  }
}
