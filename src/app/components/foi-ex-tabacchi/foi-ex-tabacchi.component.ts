import { Component } from '@angular/core';
import { MONTH_NAMES } from '../../utils/dates';
import { FOI_EX_TABACCHI, FoiExTabacchi } from '../../utils/foi/foi';

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

  years = new Set(FOI_EX_TABACCHI.map(foi => foi.year));
  currentYear: number = new Date().getFullYear();

  isCurrentYear(y: number): boolean {
    return y === this.currentYear;
  }

  foiByYear(): FoiDesc[] {
    return this.foi.filter(foi => foi.year === this.currentYear);
  }
}
