import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Announcements } from 'src/app/models/announcements.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(private http: HttpClient) { }


  getAnnouncements():Observable<Announcements[]>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Announcements[]>("http://localhost:3000/announcements",  {headers: headers})
      .pipe(map( (res:Announcements[]) => res));
  }

  getOneAnnouncement(id: string):Observable<Announcements> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Announcements>(`http://localhost:3000/announcements/${id}`,  {headers: headers})
      .pipe(map( (res:Announcements) => res));
  }


  getMyAnnouncements(id: string):Observable<Announcements[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return  this.http.get<Announcements[]>(`http://localhost:3000/announcements/owner/${id}`,  {headers: headers})
      .pipe(map( (res:Announcements[]) => res));
  }
  postAnnouncements(announcement: Announcements):Observable<Announcements>{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const formData  = new FormData();
        
        formData.append('image', announcement.imageUrl);
        
        for (const file of announcement.secondaryImagesUrl) {
          formData.append('images', file);

        }
        formData.append('ownerId', announcement.ownerId);
        formData.append('title', announcement.title);
        formData.append('sqm', announcement.sqm.toString());
        formData.append('description', announcement.description);
        formData.append('type_ann', announcement.type_ann);
        formData.append('type_lodgement', announcement.type_lodgement);
        formData.append('availability', announcement.availability.toString());
        formData.append('governorate', announcement.governorate);
        formData.append('city', announcement.city);
        formData.append('street', announcement.street);
        formData.append('price', announcement.price);
        if(announcement.type_lodgement === "Appartment"){
          
          formData.append('floor', announcement.floor.toString());
          formData.append('elevator', announcement.elevator.toString());
        }else if(announcement.type_lodgement === "House"){
          formData.append('garden', announcement.garden.toString());
          formData.append('baths', announcement.baths.toString());
          formData.append('rooms', announcement.rooms.toString());
          formData.append('equippedKitchen', announcement.equippedKitchen.toString());
        }
        
      return this.http.post<Announcements>("http://localhost:3000/announcements", formData)
        .pipe(map( (res:Announcements) => res));
  }
  updateAnnouncement(updates : any, id : string){
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.put<Announcements>(`http://localhost:3000/announcements/${id}`,  updates,{headers: headers})
      .pipe(map( (res) => res));
  }
  deleteAnnouncement(id : string):Observable<any>{
      
      return this.http.request<any>("DELETE",`http://localhost:3000/announcements/${id}`)
      .pipe(map( (res) => res));
  }
}
