import { endOfMonth, getDate, getMonth, isAfter } from 'date-fns';
import { numeroIndice } from './foi';

const MAX_DIGIT_APPROX = 5;

export interface CoefficienteInflazione {
  date: Date;
  value: string;
}

interface CoefficientiMensiliParam {
  baseDate: Date;
  firstDayOfTrading: Date;
  year: number;
  month: number;
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

export function getMesiCedola(date: Date): number[] {
  const semestre = 6;
  let mese1 = getMonth(date);
  let mese2 = (mese1 + semestre) % 12;

  if (mese2 < mese1) {
    const t = mese1;
    mese1 = mese2;
    mese2 = t;
  }
  return [mese1, mese2];
}

export function getDataUltimaCedola(date: Date, year: number, month: number): Date {
  const [m1, m2] = getMesiCedola(date);
  let cedolaMonth;

  if (month > m2) {
    cedolaMonth = m2;
  } else if (month > m1) {
    cedolaMonth = m1;
  } else {
    cedolaMonth = m2;
    year = year - 1;
  }
  return new Date(year, cedolaMonth, getDate(date));
}

export function getCoefficientiMensili(param: CoefficientiMensiliParam): CoefficienteInflazione[] {
  const arr: CoefficienteInflazione[] = [];
  const endDay = endOfMonth(new Date(param.year, param.month, 1));

  if (isAfter(param.firstDayOfTrading, endDay)) {
    return arr;
  }

  for (let i = 1; i <= getDate(endDay); i++) {
    const date = new Date(param.year, param.month, i);
    if (isAfter(param.firstDayOfTrading, date)) {
      continue;
    }
    const value = coefficienteInflazioneByDate(date, param.baseDate);
    if (value != null) {
      arr.push({ date, value });
    }
  }
  return arr;
}
