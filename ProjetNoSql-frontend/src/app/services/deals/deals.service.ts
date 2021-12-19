import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient) { }

  postDeal(deal: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return  this.http.post<any[]>(`http://localhost:3000/deals`,  deal, {headers: headers})
      .pipe(map( (res:any[]) => res));
  }
}
