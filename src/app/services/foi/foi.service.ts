import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FoiExTabacchi } from '../../utils/foi/foiTypes';

@Injectable({
  providedIn: 'root'
})
export class FoiService {

  constructor(private http: HttpClient) { }

  listFoi(): Observable<readonly FoiExTabacchi[]> {
    return this.http.get<FoiExTabacchi[]>('https://raw.githubusercontent.com/money44nothing/btp-italia-data/main/foi.json');
  }
}
