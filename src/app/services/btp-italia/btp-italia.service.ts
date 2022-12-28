import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { clearTime, itaToDate } from '../../utils/dates';
import { BtpItalia } from './BtpItalia';

@Injectable({
  providedIn: 'root'
})
export class BtpItaliaService {

  constructor() { }

  list(): Observable<BtpItalia[]> {
    const nowTime = clearTime(new Date()).getTime();

    return of(
      [
        /* eslint-disable max-len */
        { nome: 'AP23', cedolaAnnualizzata: 0.50,	isin: 'IT0005105843', isinCUM: 'IT0005105835', dataInizioNegoziazione: itaToDate('20/04/2015'), dataScadenza: itaToDate('20/04/2023') },
        { nome: 'MG23', cedolaAnnualizzata: 0.45,	isin: 'IT0005253676', isinCUM: 'IT0005253668', dataInizioNegoziazione: itaToDate('22/05/2017'), dataScadenza: itaToDate('22/05/2023') },
        { nome: 'NV23', cedolaAnnualizzata: 0.25,	isin: 'IT0005312142', isinCUM: 'IT0005312134', dataInizioNegoziazione: itaToDate('20/11/2017'), dataScadenza: itaToDate('20/11/2023') },
        { nome: 'AP24', cedolaAnnualizzata: 0.40,	isin: 'IT0005174906', isinCUM: 'IT0005174898', dataInizioNegoziazione: itaToDate('11/04/2016'), dataScadenza: itaToDate('11/04/2024') },
        { nome: 'OT24', cedolaAnnualizzata: 0.35,	isin: 'IT0005217770', isinCUM: 'IT0005217762', dataInizioNegoziazione: itaToDate('24/10/2016'), dataScadenza: itaToDate('24/10/2024') },
        { nome: 'MG25', cedolaAnnualizzata: 1.40,	isin: 'IT0005410912', isinCUM: 'IT0005410904', dataInizioNegoziazione: itaToDate('26/05/2020'), dataScadenza: itaToDate('26/05/2025') },
        { nome: 'MG26', cedolaAnnualizzata: 0.55,	isin: 'IT0005332835', isinCUM: 'IT0005332827', dataInizioNegoziazione: itaToDate('21/05/2018'), dataScadenza: itaToDate('21/05/2026') },
        { nome: 'OT27', cedolaAnnualizzata: 0.65,	isin: 'IT0005388175', isinCUM: 'IT0005388167', dataInizioNegoziazione: itaToDate('28/10/2019'), dataScadenza: itaToDate('28/10/2027') },
        { nome: 'NV28', cedolaAnnualizzata: 1.60,	isin: 'IT0005517195', isinCUM: 'IT0005517187', dataInizioNegoziazione: itaToDate('22/11/2022'), dataScadenza: itaToDate('22/11/2028') },
        { nome: 'GN30', cedolaAnnualizzata: 1.60,	isin: 'IT0005497000', isinCUM: 'IT0005496994', dataInizioNegoziazione: itaToDate('28/06/2022'), dataScadenza: itaToDate('28/06/2030') },
      ].filter(b => (b.dataScadenza.getTime() - nowTime) >= 0)
    );
  }

  findByIsin(list: BtpItalia[], isin: string): BtpItalia | undefined {
    return list.find(b => b.isin === isin || b.isinCUM === isin);
  }
}
