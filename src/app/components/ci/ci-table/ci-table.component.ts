import { Component, Input } from '@angular/core';
import { CoefficienteInflazioneMensile } from '../../../utils/foi/coefficienteInflazioneTypes';

@Component({
  selector: 'app-ci-table',
  templateUrl: './ci-table.component.html',
  styleUrls: ['./ci-table.component.scss']
})
export class CiTableComponent {
  @Input()
  coefficienti?: CoefficienteInflazioneMensile | null;

  get indexBaseDateChange(): number {
    return this.coefficienti?.indexBaseDateChange ?? -1;
  }

  baseDateClass(index: number): Record<string, boolean> {
    const isBaseChanged = index === this.coefficienti?.indexBaseDateChange;
    return {
      'text-danger': isBaseChanged,
      'base-changed': isBaseChanged,
    };
  }

  baseDateNoteStyle(): Record<string, string> {
    const isBaseChanged = this.coefficienti ? this.coefficienti.indexBaseDateChange >= 0 : false;
    return {
      visibility: isBaseChanged ? 'visible' : 'collapse',
    };
  }
}
