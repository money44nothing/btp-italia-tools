import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import {
  CoefficienteBaseInfo,
  CoefficienteInflazioneDate,
  CoefficienteInflazioneMensile
} from '../../utils/foi/coefficienteInflazioneTypes';

@Pipe({
  name: 'ciBaseDate'
})
export class CIBaseDatePipe implements PipeTransform {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  transform(value?: CoefficienteInflazioneMensile | null, indexStr?: string, base?: string): string | null {
    if (!value) {
      return null;
    }
    const index = this.decodeIndex(value, indexStr);
    if (index < 0) {
      return null;
    }
    const baseInfo = this.decodeBase(value.days[index], base);
    return baseInfo ? formatDate(baseInfo.baseDate, 'dd/MM/yyyy', this.locale) : null;
  }

  decodeIndex(ciMensile: CoefficienteInflazioneMensile, param?: string): number {
    if (param === 'dc') {
      return ciMensile.indexBaseDateChange;
    }
    const index = Number(param);
    if (isNaN(index)) {
      return -1;
    }
    return 0 <= index && index < ciMensile.days.length ? index : -1;
  }

  decodeBase(ciDate: CoefficienteInflazioneDate, param?: string): CoefficienteBaseInfo | undefined {
    if (param === 'b1') {
      return ciDate.base1;
    }
    if (param === 'b2') {
      return ciDate.base2;
    }
    console.error(`invalid base ${param}`);
    return undefined;
  }
}
