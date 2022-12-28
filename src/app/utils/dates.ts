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

export function itaToDate(itaStrDate: string): Date {
  const [day, month, year] = itaStrDate.split('/');
  return new Date(+year, +month - 1, +day);
}

export function clearTime(date: Date): Date {
  date.setSeconds(0);
  date.setHours(0);
  date.setMinutes(0);
  date.setMilliseconds(0);

  return date;
}
