import { endOfMonth, getDate, getMonth, getYear } from 'date-fns';
import addMonths from 'date-fns/addMonths';

const FOI_PREV_3_MONTHS = -3;
const FOI_PREV_2_MONTHS = -2;

export interface FoiExTabacchi {
  year: number;
  month: number;
  value: number;
}

export const FOI_EX_TABACCHI: readonly FoiExTabacchi[] = [
  { year: 2011, month: 1, value: 101.2 },
  { year: 2011, month: 2, value: 101.5 },
  { year: 2011, month: 3, value: 101.9 },
  { year: 2011, month: 4, value: 102.4 },
  { year: 2011, month: 5, value: 102.5 },
  { year: 2011, month: 6, value: 102.6 },
  { year: 2011, month: 7, value: 102.9 },
  { year: 2011, month: 8, value: 103.2 },
  { year: 2011, month: 9, value: 103.2 },
  { year: 2011, month: 10, value: 103.6 },
  { year: 2011, month: 11, value: 103.7 },
  { year: 2011, month: 12, value: 104 },
  { year: 2012, month: 1, value: 104.4 },
  { year: 2012, month: 2, value: 104.8 },
  { year: 2012, month: 3, value: 105.2 },
  { year: 2012, month: 4, value: 105.7 },
  { year: 2012, month: 5, value: 105.6 },
  { year: 2012, month: 6, value: 105.8 },
  { year: 2012, month: 7, value: 105.9 },
  { year: 2012, month: 8, value: 106.4 },
  { year: 2012, month: 9, value: 106.4 },
  { year: 2012, month: 10, value: 106.4 },
  { year: 2012, month: 11, value: 106.2 },
  { year: 2012, month: 12, value: 106.5 },
  { year: 2013, month: 1, value: 106.7 },
  { year: 2013, month: 2, value: 106.7 },
  { year: 2013, month: 3, value: 106.9 },
  { year: 2013, month: 4, value: 106.9 },
  { year: 2013, month: 5, value: 106.9 },
  { year: 2013, month: 6, value: 107.1 },
  { year: 2013, month: 7, value: 107.2 },
  { year: 2013, month: 8, value: 107.6 },
  { year: 2013, month: 9, value: 107.2 },
  { year: 2013, month: 10, value: 107.1 },
  { year: 2013, month: 11, value: 106.8 },
  { year: 2013, month: 12, value: 107.1 },
  { year: 2014, month: 1, value: 107.3 },
  { year: 2014, month: 2, value: 107.2 },
  { year: 2014, month: 3, value: 107.2 },
  { year: 2014, month: 4, value: 107.4 },
  { year: 2014, month: 5, value: 107.3 },
  { year: 2014, month: 6, value: 107.4 },
  { year: 2014, month: 7, value: 107.3 },
  { year: 2014, month: 8, value: 107.5 },
  { year: 2014, month: 9, value: 107.1 },
  { year: 2014, month: 10, value: 107.2 },
  { year: 2014, month: 11, value: 107 },
  { year: 2014, month: 12, value: 107 },
  { year: 2015, month: 1, value: 106.5 },
  { year: 2015, month: 2, value: 106.8 },
  { year: 2015, month: 3, value: 107 },
  { year: 2015, month: 4, value: 107.1 },
  { year: 2015, month: 5, value: 107.2 },
  { year: 2015, month: 6, value: 107.3 },
  { year: 2015, month: 7, value: 107.2 },
  { year: 2015, month: 8, value: 107.4 },
  { year: 2015, month: 9, value: 107 },
  { year: 2015, month: 10, value: 107.2 },
  { year: 2015, month: 11, value: 107 },
  { year: 2015, month: 12, value: 107 },
  { year: 2016, month: 1, value: 99.7 },
  { year: 2016, month: 2, value: 99.5 },
  { year: 2016, month: 3, value: 99.6 },
  { year: 2016, month: 4, value: 99.6 },
  { year: 2016, month: 5, value: 99.7 },
  { year: 2016, month: 6, value: 99.9 },
  { year: 2016, month: 7, value: 100 },
  { year: 2016, month: 8, value: 100.2 },
  { year: 2016, month: 9, value: 100 },
  { year: 2016, month: 10, value: 100 },
  { year: 2016, month: 11, value: 100 },
  { year: 2016, month: 12, value: 100.3 },
  { year: 2017, month: 1, value: 100.6 },
  { year: 2017, month: 2, value: 101 },
  { year: 2017, month: 3, value: 101 },
  { year: 2017, month: 4, value: 101.3 },
  { year: 2017, month: 5, value: 101.1 },
  { year: 2017, month: 6, value: 101 },
  { year: 2017, month: 7, value: 101 },
  { year: 2017, month: 8, value: 101.4 },
  { year: 2017, month: 9, value: 101.1 },
  { year: 2017, month: 10, value: 100.9 },
  { year: 2017, month: 11, value: 100.8 },
  { year: 2017, month: 12, value: 101.1 },
  { year: 2018, month: 1, value: 101.5 },
  { year: 2018, month: 2, value: 101.5 },
  { year: 2018, month: 3, value: 101.7 },
  { year: 2018, month: 4, value: 101.7 },
  { year: 2018, month: 5, value: 102 },
  { year: 2018, month: 6, value: 102.2 },
  { year: 2018, month: 7, value: 102.5 },
  { year: 2018, month: 8, value: 102.9 },
  { year: 2018, month: 9, value: 102.4 },
  { year: 2018, month: 10, value: 102.4 },
  { year: 2018, month: 11, value: 102.2 },
  { year: 2018, month: 12, value: 102.1 },
  { year: 2019, month: 1, value: 102.2 },
  { year: 2019, month: 2, value: 102.3 },
  { year: 2019, month: 3, value: 102.5 },
  { year: 2019, month: 4, value: 102.6 },
  { year: 2019, month: 5, value: 102.7 },
  { year: 2019, month: 6, value: 102.7 },
  { year: 2019, month: 7, value: 102.7 },
  { year: 2019, month: 8, value: 103.2 },
  { year: 2019, month: 9, value: 102.5 },
  { year: 2019, month: 10, value: 102.4 },
  { year: 2019, month: 11, value: 102.3 },
  { year: 2019, month: 12, value: 102.5 },
  { year: 2020, month: 1, value: 102.7 },
  { year: 2020, month: 2, value: 102.5 },
  { year: 2020, month: 3, value: 102.6 },
  { year: 2020, month: 4, value: 102.5 },
  { year: 2020, month: 5, value: 102.3 },
  { year: 2020, month: 6, value: 102.4 },
  { year: 2020, month: 7, value: 102.3 },
  { year: 2020, month: 8, value: 102.5 },
  { year: 2020, month: 9, value: 101.9 },
  { year: 2020, month: 10, value: 102 },
  { year: 2020, month: 11, value: 102 },
  { year: 2020, month: 12, value: 102.3 },
  { year: 2021, month: 1, value: 102.9 },
  { year: 2021, month: 2, value: 103 },
  { year: 2021, month: 3, value: 103.3 },
  { year: 2021, month: 4, value: 103.7 },
  { year: 2021, month: 5, value: 103.6 },
  { year: 2021, month: 6, value: 103.8 },
  { year: 2021, month: 7, value: 104.2 },
  { year: 2021, month: 8, value: 104.7 },
  { year: 2021, month: 9, value: 104.5 },
  { year: 2021, month: 10, value: 105.1 },
  { year: 2021, month: 11, value: 105.7 },
  { year: 2021, month: 12, value: 106.2 },
  { year: 2022, month: 1, value: 107.7 },
  { year: 2022, month: 2, value: 108.8 },
  { year: 2022, month: 3, value: 109.9 },
  { year: 2022, month: 4, value: 109.7 },
  { year: 2022, month: 5, value: 110.6 },
  { year: 2022, month: 6, value: 111.9 },
  { year: 2022, month: 7, value: 112.3 },
  { year: 2022, month: 8, value: 113.2 },
  { year: 2022, month: 9, value: 113.5 },
  { year: 2022, month: 10, value: 117.2 },
  { year: 2022, month: 11, value: 117.9 },
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
