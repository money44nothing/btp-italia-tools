import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { clearTime } from '../../utils/dates';
import { BtpItalia } from './BtpItalia';

@Injectable({
  providedIn: 'root'
})
export class BtpItaliaService {

  constructor(private http: HttpClient) { }

  list(): Observable<BtpItalia[]> {
    const nowTime = clearTime(new Date()).getTime();

    return this.http.get<BtpItalia[]>('https://raw.githubusercontent.com/money44nothing/btp-italia-data/main/titoli.json')
      .pipe(
        map(arr => arr.filter(b => (b.dataScadenza.getTime() - nowTime) >= 0)
          .sort((l, r) => l.dataScadenza.getTime() - r.dataScadenza.getTime()))
      );
  }

  findByIsin(list: BtpItalia[], isin: string): BtpItalia | undefined {
    return list.find(b => b.isin === isin || b.isinCUM === isin);
  }
}
