export const MAX_DIGIT_APPROX = 5;
export interface CoefficienteInflazione {
  coefficienteDate: Date;
  coefficiente: number;
  baseDate: Date;
  numeroIndiceCoefficienteDate: number;
  numeroIndiceBaseDate: number;
}

export interface CoefficientiMensiliParam {
  baseDate: Date;
  firstDayOfTrading: Date;
  year: number;
  month: number;
}
