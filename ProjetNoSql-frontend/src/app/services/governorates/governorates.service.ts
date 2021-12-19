import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private http: HttpClient) { }

  getGovernorates() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any[]>('http://localhost:3000/governorates', {headers: headers})
        .pipe(map( (res) => res ))
  }
  getCitiesByGovernorate(governorate: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<any[]>(`http://localhost:3000/cities/${governorate}`, {headers: headers})
        .pipe(map( (res) => res ))
  }

}
