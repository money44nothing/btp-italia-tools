export const MONTH_NAMES = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

export function toUTC(date: Date, ignoreTime: boolean = true): Date {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    ignoreTime ? 0 : date.getHours(),
    ignoreTime ? 0 : date.getMinutes(),
    ignoreTime ? 0 : date.getSeconds()));
}

