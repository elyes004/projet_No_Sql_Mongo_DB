import { Component, OnInit } from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';


@Component({
  selector: 'app-add-appartment',
  templateUrl: './add-appartment.component.html',
  styleUrls: ['./add-appartment.component.css']
})

export class AddAppartmentComponent implements OnInit {
  announcement: Announcements = {
    ownerId: '',
    title: '',
    sqm: 0,
    description: '',

    type_ann:  '',
    type_lodgement: 'Appartment',
    availability:  true,
    governorate: '',
    city: '',
    street: '',
    price: '',

    floor: 0,
    elevator: false,
  }
  constructor(private announcementService: AnnouncementsService) { }

  ngOnInit(): void {
    this.announcement.ownerId = JSON.parse(localStorage.getItem('user')).id
  }
  onMainImageSelected(event){
    const file : File = event.target.files[0];
    this.announcement.imageUrl = file;
  }
  onDetailImagesSelected(event){
    const files : File[] = event.target.files;
    this.announcement.secondaryImagesUrl = files;
  }
  submitAppartment(){
    const postAnnouncement = this.announcement;
    this.announcementService.postAnnouncements(postAnnouncement).subscribe()
    }
}
