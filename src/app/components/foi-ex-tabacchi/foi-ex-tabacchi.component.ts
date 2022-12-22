import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportFOIService } from '../../services/foi/export-foi.service';
import { MONTH_NAMES } from '../../utils/dates';
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

  permalinkPath = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private exportService: ExportFOIService
  ) {
    this.permalinkPath = location.pathname;
    const year = Number(activatedRoute.snapshot.queryParamMap.get('year'));
    this.currentYear = this.years.has(year) ? year : new Date().getFullYear();
  }

  isCurrentYear(y: number): boolean {
    return y === this.currentYear;
  }

  export(): void {
    this.exportService.exportFoi({
      list: this.foiList,
      fileName: `FOI-Ex-T-${this.currentYear}`,
      sheetTitle: `FOI Ex Tabacchi ${this.currentYear}`
    });
  }
}
