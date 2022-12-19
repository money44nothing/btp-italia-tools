import { endOfMonth, getDate, getMonth, getYear } from 'date-fns';
import addMonths from 'date-fns/addMonths';

const MAX_DIGIT_APPROX = 5;
const FOI_PREV_3_MONTHS = -3;
const FOI_PREV_2_MONTHS = -2;

export interface FoiExTabacchi {
  year: number;
  month: number;
  value: number;
}

export interface CoefficienteInflazione{
  date: Date;
  value: string;
}

export const FOI_EX_TABACCHI: readonly FoiExTabacchi[] = [
  { year: 2020, month:  1, value: 102.7 },
  { year: 2020, month:  2, value: 102.5 },
  { year: 2020, month:  3, value: 102.6 },
  { year: 2020, month:  4, value: 102.5 },
  { year: 2020, month:  5, value: 102.3 },
  { year: 2020, month:  6, value: 102.4 },
  { year: 2020, month:  7, value: 102.3 },
  { year: 2020, month:  8, value: 102.5 },
  { year: 2020, month:  9, value: 101.9 },
  { year: 2020, month: 10, value: 102 },
  { year: 2020, month: 11, value: 102 },
  { year: 2020, month: 12, value: 102.3 },
  { year: 2021, month:  1, value: 102.9 },
  { year: 2021, month:  2, value: 103 },
  { year: 2021, month:  3, value: 103.3 },
  { year: 2021, month:  4, value: 103.7 },
  { year: 2021, month:  5, value: 103.6 },
  { year: 2021, month:  6, value: 103.8 },
  { year: 2021, month:  7, value: 104.2 },
  { year: 2021, month:  8, value: 104.7 },
  { year: 2021, month:  9, value: 104.5 },
  { year: 2021, month: 10, value: 105.1 },
  { year: 2021, month: 11, value: 105.7 },
  { year: 2021, month: 12, value: 106.2 },
  { year: 2022, month:  1, value: 107.7 },
  { year: 2022, month:  2, value: 108.8 },
  { year: 2022, month:  3, value: 109.9 },
  { year: 2022, month:  4, value: 109.7 },
  { year: 2022, month:  5, value: 110.6 },
  { year: 2022, month:  6, value: 111.9 },
  { year: 2022, month:  7, value: 112.3 },
  { year: 2022, month:  8, value: 113.2 },
  { year: 2022, month:  9, value: 113.5 },
  { year: 2022, month: 10, value: 117.2 },
] as const;

export function foiExTByDate(date: Date): number | null {
  return foiExT(getYear(date), getMonth(date) + 1);
}

export function foiExT(year: number, month: number): number | null {
  const v = FOI_EX_TABACCHI.find(foi => foi.year === year && foi.month === month);
  return v ? v.value : null;
}

export function numeroIndice(date: Date): number | null {
  const foi3 = addMonths(date, FOI_PREV_3_MONTHS);
  const foi2 = addMonths(date, FOI_PREV_2_MONTHS);
  const day = getDate(date) - 1;
  const endDay = getDate(endOfMonth(date));
  const f3 = foiExTByDate(foi3);
  if (f3 === null) {
    return null;
  }
  const f2 = foiExTByDate(foi2);
  if (f2 === null) {
    return null;
  }

  return f3 + (f2 - f3) * day / endDay;
}

export function coefficienteInflazioneByDate(date: Date, baseDate: Date): string | null {
  const ni1 = numeroIndice(date);
  if (ni1 === null) {
    return null;
  }
  const ni2 = numeroIndice(baseDate);
  if (ni2 === null) {
    return null;
  }

  return coefficienteInflazioneByNumeroIndice(ni1, ni2);
}

export function coefficienteInflazioneByNumeroIndice(numeroIndice1: number, numeroIndice2: number): string | null {
  return (numeroIndice1 / numeroIndice2).toFixed(MAX_DIGIT_APPROX);
}
