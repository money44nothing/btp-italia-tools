import { endOfMonth, getDate, getMonth, getYear, isAfter } from 'date-fns';
import {
  CoefficienteBaseInfo,
  CoefficienteInflazioneDate,
  CoefficienteInflazioneMensile,
  CoefficientiMensiliParam
} from './coefficienteInflazioneTypes';
import { numeroIndiceByDate } from './foi';
import { FoiExTabacchi } from './foiTypes';

export function coefficienteInflazioneByDate(
  foiList: readonly FoiExTabacchi[],
  date: Date,
  baseDate: Date
): number | null {
  const ni1 = numeroIndiceByDate(foiList, date);
  if (ni1 === null) {
    return null;
  }
  const ni2 = numeroIndiceByDate(foiList, baseDate);
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
    // } else if (month === m2 && year === getYear(date)) {
    //   cedolaMonth = m2;
  } else if (month > m1) {
    cedolaMonth = m1;
  } else if (month === m1 && year === getYear(date)) {
    cedolaMonth = m1;
  } else {
    cedolaMonth = m2;
    year = year - 1;
  }
  return new Date(year, cedolaMonth, getDate(date));
}

export function getCoefficienteMensile(
  foiList: readonly FoiExTabacchi[],
  param: Readonly<CoefficientiMensiliParam>
): CoefficienteInflazioneMensile | null {
  const lastDayOfMonth = endOfMonth(new Date(param.year, param.month, 1));

  if (isAfter(param.firstDayOfTrading, lastDayOfMonth)) {
    return null;
  }

  return fillMese(foiList, param, getDate(lastDayOfMonth));
}

function fillMese(
  foiList: readonly FoiExTabacchi[],
  param: Readonly<CoefficientiMensiliParam>,
  endDay: number,
): CoefficienteInflazioneMensile | null {
  let baseDate = validBaseDate(param);
  let numeroIndiceBaseDate = numeroIndiceByDate(foiList, baseDate);

  if (numeroIndiceBaseDate == null) {
    return null;
  }
  const ciMensile: CoefficienteInflazioneMensile = { days: [], indexBaseDateChange: -1 };
  const isCedolaMonth = getMesiCedola(param.firstDayOfTrading).includes(param.month);
  const firstDayOfTrading = getDate(param.firstDayOfTrading);

  let useBase1 = true;
  for (let day = 1; day <= endDay; day++) {
    const coefficienteDate = new Date(param.year, param.month, day);
    if (isAfter(param.firstDayOfTrading, coefficienteDate)) {
      continue;
    }
    const ci: CoefficienteInflazioneDate = { coefficienteDate, numeroIndiceCoefficienteDate: 0 };
    if (isCedolaMonth && day === firstDayOfTrading) {
      useBase1 = !changeBase({ foiList, ciMensile, ci, baseDate, coefficienteDate });
      baseDate = coefficienteDate;
      numeroIndiceBaseDate = ci.base1?.numeroIndice ?? null;
    }
    const numeroIndiceCoefficienteDate = numeroIndiceByDate(foiList, coefficienteDate);
    if (numeroIndiceCoefficienteDate != null && numeroIndiceBaseDate != null) {
      const baseInfo = createBaseInfo({ baseDate, numeroIndiceBaseDate, numeroIndiceCoefficienteDate });
      updateCoefficienteInflazioneDate({ ci, numeroIndiceCoefficienteDate, baseInfo, useBase1 });
      ciMensile.days.push(ci);
    }
  }
  return ciMensile;
}

function validBaseDate(param: Readonly<CoefficientiMensiliParam>): Date {
  if (param.baseDate.getTime() < param.firstDayOfTrading.getTime()) {
    return param.firstDayOfTrading;
  }
  return param.baseDate;
}

function createBaseInfo(
  {
    baseDate,
    numeroIndiceBaseDate,
    numeroIndiceCoefficienteDate
  }: {
    baseDate: Date;
    numeroIndiceBaseDate: number;
    numeroIndiceCoefficienteDate: number;
  },
): CoefficienteBaseInfo {
  const coefficiente = coefficienteInflazioneByNumeroIndice(numeroIndiceCoefficienteDate, numeroIndiceBaseDate);
  return { coefficiente, baseDate, numeroIndice: numeroIndiceBaseDate };
}

function changeBase(
  {
    foiList,
    ciMensile,
    ci,
    baseDate,
    coefficienteDate
  }: {
    foiList: readonly FoiExTabacchi[];
    ciMensile: CoefficienteInflazioneMensile;
    ci: CoefficienteInflazioneDate;
    baseDate: Date;
    coefficienteDate: Date;
  },
): boolean {
  let isBaseChanged = false;
  // change base only if date differs and isn't the 'negoziazione' date
  if (baseDate.getTime() !== coefficienteDate.getTime()) {
    isBaseChanged = true;
    ciMensile.indexBaseDateChange = ciMensile.days.length;
  }
  const numeroIndice = numeroIndiceByDate(foiList, coefficienteDate);
  const numeroIndiceBaseDate = numeroIndiceByDate(foiList, baseDate);
  if (numeroIndice != null && numeroIndiceBaseDate != null) {
    ci.base1 = {
      coefficiente: coefficienteInflazioneByNumeroIndice(numeroIndice, numeroIndiceBaseDate),
      baseDate,
      numeroIndice
    };
  }

  return isBaseChanged;
}

function updateCoefficienteInflazioneDate(
  {
    ci,
    numeroIndiceCoefficienteDate,
    baseInfo,
    useBase1
  }: {
    ci: CoefficienteInflazioneDate;
    numeroIndiceCoefficienteDate: number;
    baseInfo: Readonly<CoefficienteBaseInfo>;
    useBase1: boolean;
  },
): void {
  ci.numeroIndiceCoefficienteDate = numeroIndiceCoefficienteDate;
  if (useBase1) {
    ci.base1 = baseInfo;
  } else {
    ci.base2 = baseInfo;
  }
}
