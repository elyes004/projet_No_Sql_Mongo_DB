import { Component, OnInit, ViewChild} from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
import { AnnouncementsService} from '../../../services/announcements/announcements.service'
import {MatDialog} from '@angular/material/dialog';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { AddAppartmentComponent } from './add-appartment/add-appartment.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteConfirmationDialogComponent } from '../../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditAnnouncementDialogComponent } from '../../edit-announcement-dialog/edit-announcement-dialog.component';

 @Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  ownerId: string

  displayedColumns: string[] = ['title', 'sqm', 'type_lodgement', 'type_ann', 'governorate', 'city', 'price', 'action']
 
  dataSource: MatTableDataSource<Announcements>

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private announcementsService: AnnouncementsService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource()
  }
  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.announcementsService.deleteAnnouncement(id).subscribe( resp => {
          if(resp.success){
            this.dataSource.data = this.dataSource.data.filter(item => item._id != id);
          }
        });
      }
    });
  }
  update(id: any) {
    const dialogRef = this.dialog.open(EditAnnouncementDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.announcementsService.updateAnnouncement(result.data ,id).subscribe( resp => {
          
            this.dataSource.data.forEach( (announcement) => {
              if(announcement._id === id){
                announcement.title = result.data.title
                announcement.rooms = result.data.rooms
                announcement.baths = result.data.baths
              }
            });

            
          
        });
      }
    });
  }
    ngOnInit(): void {
    this.ownerId = JSON.parse(localStorage.getItem('user')).id;
    this.announcementsService.getMyAnnouncements(this.ownerId).subscribe( (data) => this.dataSource.data = data as Announcements[]) 
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  openDialog() {
    this.dialog.open(AddItemModalComponent);
  }
  openDialogAppartment(){
    this.dialog.open(AddAppartmentComponent);
  }

}

