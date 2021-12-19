import { Component, Inject, Optional  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Announcements } from 'src/app/models/announcements.model';


interface AnnouncementEditFields {
  title: string
  rooms: number
  baths: number
}

@Component({
  selector: 'app-edit-announcement-dialog',
  templateUrl: './edit-announcement-dialog.component.html',
  styleUrls: ['./edit-announcement-dialog.component.css']
})
export class EditAnnouncementDialogComponent {
  
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<EditAnnouncementDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AnnouncementEditFields) { 
      this.local_data = {...data};
    }
 
  doAction(){
    this.dialogRef.close({data:this.local_data});
    console.log("from edit ann dialog")
    console.log(this.local_data)

  }

}
