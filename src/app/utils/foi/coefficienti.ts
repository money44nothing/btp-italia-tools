import { endOfMonth, getDate, getMonth, isAfter } from 'date-fns';
import { CoefficienteInflazione, CoefficientiMensiliParam } from './coefficienteInflazioneTypes';
import { numeroIndice } from './foi';

export function coefficienteInflazioneByDate(date: Date, baseDate: Date): number | null {
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

export function coefficienteInflazioneByNumeroIndice(numeroIndice1: number, numeroIndice2: number): number {
  return numeroIndice1 / numeroIndice2;
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

export function getCoefficienteMensile(param: Readonly<CoefficientiMensiliParam>): CoefficienteInflazione[] {
  const lastDayOfMonth = endOfMonth(new Date(param.year, param.month, 1));

  if (isAfter(param.firstDayOfTrading, lastDayOfMonth)) {
    return [];
  }

  return fillMese(param, getDate(lastDayOfMonth));
}

function fillMese(
  param: Readonly<CoefficientiMensiliParam>,
  endDay: number,
): CoefficienteInflazione[] {
  const ciMensili: CoefficienteInflazione[] = [];
  const isCedolaMonth = getMesiCedola(param.firstDayOfTrading).includes(param.month);
  const firstDayOfTrading = getDate(param.firstDayOfTrading);
  let baseDate = param.baseDate;

  for (let day = 1; day <= endDay; day++) {
    const date = new Date(param.year, param.month, day);
    if (isAfter(param.firstDayOfTrading, date)) {
      continue;
    }
    const value = coefficienteInflazioneByDate(date, baseDate);
    if (value != null) {
      ciMensili.push({ date, value, baseDate });
    }
    if (isCedolaMonth && day === firstDayOfTrading) {
      baseDate = date;
    }
  }
  return ciMensili;
}

