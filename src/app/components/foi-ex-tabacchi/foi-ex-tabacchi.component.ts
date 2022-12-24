import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportFOIService } from '../../services/foi/export-foi.service';
import { FoiService } from '../../services/foi/foi.service';
import { MONTH_NAMES } from '../../utils/dates';
import { FoiExTabacchi } from '../../utils/foi/foiTypes';

type FoiDesc = FoiExTabacchi & { monthName: string };

@Component({
  selector: 'app-foi-ex-tabacchi',
  templateUrl: './foi-ex-tabacchi.component.html',
  styleUrls: ['./foi-ex-tabacchi.component.scss']
})
export class FoiExTabacchiComponent implements OnInit {
  private foi: FoiDesc[] = [];

  foiFiltered: FoiDesc[] = [];
  years = new Set<number>();
  permalinkPath = '';

  private mCurrentYear = 0;

  get currentYear(): number {
    return this.mCurrentYear;
  }

  set currentYear(v: number) {
    this.mCurrentYear = v;
    this.foiFiltered = this.foi.filter(foi => foi.year === this.mCurrentYear);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private foiService: FoiService,
    private exportService: ExportFOIService
  ) {
    this.permalinkPath = location.pathname;
  }

  ngOnInit(): void {
    this.foiService.listFoi().subscribe(foiList => {
      this.foi = foiList.map(foi => ({
        ...foi,
        monthName: MONTH_NAMES[foi.month - 1], }));
      this.years = new Set(foiList.map(foi => foi.year));
      const year = Number(this.activatedRoute.snapshot.queryParamMap.get('year'));
      this.currentYear = this.years.has(year) ? year : new Date().getFullYear();
    });
  }

  isCurrentYear(y: number): boolean {
    return y === this.currentYear;
  }

  export(): void {
    this.exportService.exportFoi({
      list: this.foiFiltered,
      fileName: `FOI-Ex-T-${this.currentYear}`,
      sheetTitle: `FOI Ex Tabacchi ${this.currentYear}`
    });
  }
}
