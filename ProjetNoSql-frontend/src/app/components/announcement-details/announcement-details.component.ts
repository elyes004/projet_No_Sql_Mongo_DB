import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcements } from 'src/app/models/announcements.model';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitsService } from 'src/app/services/visits/visits.service';


@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit {
  announcement: Announcements;
  visitDate: Date;
  constructor(private route: ActivatedRoute,
              private announcementService: AnnouncementsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.announcementService.getOneAnnouncement(id).subscribe( (data) => {
      this.announcement = data
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VisitDateDialog, {
      width: '300px',
      data: {firstname: JSON.parse(localStorage.getItem('user')).firstname,
             lastname: JSON.parse(localStorage.getItem('user')).lastname,
             announcementId: this.announcement._id,
             visitDate: this.visitDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.visitDate = result;
    });
  }

  alignDescription(description: string)
  {
    let row = '';
    const text = description;

    let index = 0
    while (index < text.length) {
      row += text.slice(index ,index + 20) + '\n';
      index += 20
    }
      return row;
  }


  isHouse(){
    return this.announcement.type_lodgement == 'House' || this.announcement.type_lodgement == 'house'
  }
  floorNumber(floor){
    switch (floor) {
      case 0:
        return "The Ground Floor";
        break;
      case 1:
        return "The First Floor";
        break;
      case 2:
        return "The Second Floor";
        break;
      case 3:
        return "The Third Floor";
        break;
      default:
        return "The "+floor+"'th Floor";
        break;
    }
  }
}


@Component({
  selector: 'visit-date-dialog',
  templateUrl: 'visit-date-dialog.html',
})
export class VisitDateDialog {

  constructor(
    public dialogRef: MatDialogRef<VisitDateDialog>,
    private visitService: VisitsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  pickVisitDate(date, announcementId){
    const visitorId = JSON.parse(localStorage.getItem('user')).id;

    this.visitService.postAVisitDate(visitorId, announcementId, date).subscribe( (data) => {
      console.log(data)
    });
  }
}
