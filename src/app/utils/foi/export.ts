import * as Excel from 'exceljs';
import * as FileSaver from 'file-saver';
import { toUTC } from '../dates';
import { CoefficienteInflazione, MAX_DIGIT_APPROX } from './coefficienteInflazioneTypes';
import { FoiExTabacchi } from './foiTypes';

// eslint-disable-next-line max-lines-per-function
export function exportCoefficienti(list: CoefficienteInflazione[], fileName: string): void {
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet('Coefficienti Inflazione');
  ws.columns = [
    { header: 'Data', key: 'dt', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
    { header: 'CI', key: 'ci', width: 15 },
  ];
  const values = list.map(r => [toUTC(r.date), +r.value.toFixed(MAX_DIGIT_APPROX)]);
  ws.addRows(values);

  wb.xlsx.writeBuffer().then((dt) => {
    const blob = new Blob([dt], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  });
}

export function exportFoi(list: FoiExTabacchi[], fileName: string): void {
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet('Coefficienti Inflazione');
  ws.columns = [
    { header: 'Anno', key: 'y', width: 15 },
    { header: 'Mese', key: 'm', width: 15 },
    { header: 'FOI Ex Tabacchi', key: 'foi', width: 15 },
  ];
  const values = list.map(r => [r.year, r.month, r.value]);
  ws.addRows(values);

  wb.xlsx.writeBuffer().then((dt) => {
    const blob = new Blob([dt], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  });
}
