import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Announcements } from 'src/app/models/announcements.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private http: HttpClient) { }

  getMyvisits(id: string):Observable<any[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return  this.http.get<any[]>(`http://localhost:3000/visits/myVisits/${id}`,  {headers: headers})
      .pipe(map( (res:any[]) => res));
  }
  
  postAVisitDate(visitorId: string, announcementId: string, date: Date){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const visit = {
      visitor: visitorId,
      announcement: announcementId,
      visitDate: date
    }
    return  this.http.post<any[]>(`http://localhost:3000/visits`,  visit, {headers: headers})
      .pipe(map( (res:any[]) => res));
  }

  getClosestVisits(id: string){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return  this.http.get<any[]>(`http://localhost:3000/visits/myVisitsThisMonth/${id}`,  {headers: headers})
      .pipe(map( (res:any[]) => res));
  }
}
