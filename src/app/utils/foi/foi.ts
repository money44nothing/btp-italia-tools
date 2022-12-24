import { endOfMonth, getDate, getMonth, getYear } from 'date-fns';
import addMonths from 'date-fns/addMonths';
import { FoiExTabacchi } from './foiTypes';

const FOI_PREV_3_MONTHS = -3;
const FOI_PREV_2_MONTHS = -2;

export function foiExTByDate(foiList: readonly FoiExTabacchi[], date: Date): number | null {
  return foiExT(foiList, getYear(date), getMonth(date) + 1);
}

export function foiExT(foiList: readonly FoiExTabacchi[], year: number, month: number): number | null {
  const v = foiList.find(foi => foi.year === year && foi.month === month);
  return v ? v.value : null;
}

export function numeroIndiceByDate(foiList: readonly FoiExTabacchi[], date: Date): number | null {
  const foi3 = addMonths(date, FOI_PREV_3_MONTHS);
  const foi2 = addMonths(date, FOI_PREV_2_MONTHS);
  const day = getDate(date) - 1;
  const endDay = getDate(endOfMonth(date));
  const f3 = foiExTByDate(foiList, foi3);
  if (f3 === null) {
    return null;
  }
  const f2 = foiExTByDate(foiList, foi2);
  if (f2 === null) {
    return null;
  }

  return f3 + (f2 - f3) * day / endDay;
}
