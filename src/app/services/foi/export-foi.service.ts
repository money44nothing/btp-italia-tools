import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';
import { toUTC } from '../../utils/dates';
import { CoefficienteInflazioneMensile, MAX_DIGIT_APPROX } from '../../utils/foi/coefficienteInflazioneTypes';
import { FoiExTabacchi } from '../../utils/foi/foiTypes';

@Injectable({
  providedIn: 'root'
})
export class ExportFOIService {
  constructor() { }

  exportCoefficienti(
    { ciMensile, sheetTitle, fileName }: { ciMensile: CoefficienteInflazioneMensile; sheetTitle?: string; fileName: string }
  ): void {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetTitle ?? '');
    const { headers, footers } = this.buildHeaders(ciMensile);

    ws.columns = headers;

    const values = ciMensile.days.map(r => ({
      coefficienteDate: toUTC(r.coefficienteDate),
      coefficiente1: r.base1 ? +r.base1.coefficiente.toFixed(MAX_DIGIT_APPROX) : null,
      coefficiente2: r.base2 ? +r.base2.coefficiente.toFixed(MAX_DIGIT_APPROX) : null,
      numeroIndiceCoefficienteDate: +r.numeroIndiceCoefficienteDate.toFixed(MAX_DIGIT_APPROX),
      numeroIndiceBaseDate: +((r.base1 ?? r.base2)?.numeroIndice.toFixed(MAX_DIGIT_APPROX) ?? '0'),
    }));
    ws.addRows(values);
    for (const f of footers) {
      ws.addRow([f]);
    }
    this.saveFile(wb, fileName).then();
  }

  private buildHeaders(ciMensile: CoefficienteInflazioneMensile): { headers: Array<Partial<Excel.Column>>; footers: string[] } {
    const headers: Array<Partial<Excel.Column>> = [
      { header: 'Data', key: 'coefficienteDate', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
    ];
    const footers = [];

    if (ciMensile.indexBaseDateChange < 0 && ciMensile.days.length > 0) {
      const date = ciMensile.days[0].base1?.baseDate;
      const dateStr = date ? format(date, 'dd/MM/yyyy') : '';
      headers.push({ header: `Base Data ${dateStr}`, key: 'coefficiente1', width: 15 });
    } else {
      const date1 = ciMensile.days[ciMensile.indexBaseDateChange].base1?.baseDate;
      const date2 = ciMensile.days[ciMensile.indexBaseDateChange].base2?.baseDate;
      const dateStr1 = date1 ? format(date1, 'dd/MM/yyyy') : '';
      const dateStr2 = date2 ? format(date2, 'dd/MM/yyyy') : '';
      headers.push({ header: `Base Data\n${dateStr1}`, key: 'coefficiente1', width: 15 });
      headers.push({ header: `Base Data\n${dateStr2}`, key: 'coefficiente2', width: 15 });
      footers.push(`${dateStr2} Per il pagamento della cedola semestrale e della rivalutazione del capitale su base semestrale`);
    }

    headers.push({ header: 'Numero Indice', key: 'numeroIndiceCoefficienteDate', width: 15 });
    headers.push({ header: 'Numero Indice Base Data', key: 'numeroIndiceBaseDate', width: 15 });
    return { headers, footers };
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
