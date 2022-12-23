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
      { header: 'Data', key: 'coefficienteDate', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'CI', key: 'coefficiente', width: 15 },
      { header: 'Base Data', key: 'baseDate', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'Numero Indice', key: 'numeroIndiceCoefficienteDate', width: 15 },
      { header: 'Numero Indice Base Data', key: 'numeroIndiceBaseDate', width: 15 },
    ];

    const values = list.map(r => ({
      coefficienteDate: toUTC(r.coefficienteDate),
      baseDate: toUTC(r.baseDate),
      coefficiente: +r.coefficiente.toFixed(MAX_DIGIT_APPROX),
      numeroIndiceCoefficienteDate: +r.numeroIndiceCoefficienteDate.toFixed(MAX_DIGIT_APPROX),
      numeroIndiceBaseDate: +r.numeroIndiceBaseDate.toFixed(MAX_DIGIT_APPROX),
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
