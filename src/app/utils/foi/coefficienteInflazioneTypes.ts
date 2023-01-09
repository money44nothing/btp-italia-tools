export const MAX_DIGIT_APPROX = 5;

export interface CoefficienteBaseInfo {
  coefficiente: number;
  baseDate: Date;
  numeroIndice: number;
}

export interface CoefficienteInflazioneDate {
  coefficienteDate: Date;
  numeroIndiceCoefficienteDate: number;
  base1?: CoefficienteBaseInfo;
  base2?: CoefficienteBaseInfo;
}

export interface CoefficienteInflazioneMensile {
  days: CoefficienteInflazioneDate[];
  indexBaseDateChange: number;
}

export interface CoefficientiMensiliParam {
  baseDate: Date;
  firstDayOfTrading: Date;
  year: number;
  month: number;
}
