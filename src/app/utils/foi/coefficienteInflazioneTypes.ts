export const MAX_DIGIT_APPROX = 5;
export interface CoefficienteInflazione {
  date: Date;
  value: number;
  baseDate: Date;
}

export interface CoefficientiMensiliParam {
  baseDate: Date;
  firstDayOfTrading: Date;
  year: number;
  month: number;
}