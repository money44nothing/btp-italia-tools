import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';
import { toUTC } from '../../utils/dates';
import { CoefficienteInflazione, MAX_DIGIT_APPROX } from '../../utils/foi/coefficienteInflazioneTypes';
import { FoiExTabacchi } from '../../utils/foi/foiTypes';

@Injectable({
  providedIn: 'root'
})
export class ExportFOIService {
  constructor() { }

  exportCoefficienti(
    { list, sheetTitle, fileName }: { list: CoefficienteInflazione[]; sheetTitle?: string; fileName: string }
  ): void {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetTitle ?? '');
    ws.columns = [
      { header: 'Data', key: 'date', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'CI', key: 'value', width: 15 },
      { header: 'Base Data', key: 'baseData', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'Numero Indice', key: 'numeroIndice', width: 15 },
    ];

    const values = list.map(r => ({
      date: toUTC(r.date),
      baseData: toUTC(r.baseDate),
      value: +r.value.toFixed(MAX_DIGIT_APPROX),
      numeroIndice: +r.numeroIndice.toFixed(MAX_DIGIT_APPROX),
    }));
    ws.addRows(values);
    this.saveFile(wb, fileName).then();
  }

  exportFoi(
    { list, sheetTitle, fileName }: { list: FoiExTabacchi[]; sheetTitle?: string; fileName: string }
  ): void {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetTitle ?? '');

    ws.columns = [
      { header: 'Anno', key: 'year', width: 15 },
      { header: 'Mese', key: 'month', width: 15 },
      { header: 'FOI Ex Tabacchi', key: 'value', width: 15 },
    ];
    ws.addRows(list);
    this.saveFile(wb, fileName).then();
  }

  private async saveFile(wb: Excel.Workbook, fileName: string): Promise<void> {
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  }
}
