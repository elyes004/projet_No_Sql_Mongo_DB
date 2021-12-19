import { Component, OnInit } from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.css']
})
export class AddItemModalComponent implements OnInit {
  announcement: Announcements = {
    ownerId: '',
    title: '',
    sqm: 0,
    description: '',

    type_ann:  '',
    type_lodgement: 'House',
    availability:  true,
    governorate: '',
    city: '',
    street: '',
    price: '',

    baths: 0,
    rooms: 0,
    equippedKitchen: false,
    garden: false
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
  submitHouse(){
    const postAnnouncement = this.announcement;
    this.announcementService.postAnnouncements(postAnnouncement).subscribe();
  }
}
