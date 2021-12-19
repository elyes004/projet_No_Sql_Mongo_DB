import { User } from 'src/app/models/users.model';
import { VisitsService } from 'src/app/services/visits/visits.service';


import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
import { AnnouncementsService} from '../../../services/announcements/announcements.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DealsService } from 'src/app/services/deals/deals.service';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  ownerId: string
  displayedColumns: string[] = ['visitor.firstname',
                                'visitor.lastname',
                                'visitor.email',
                                'visitor.phoneNumber',
                                'announcement.title',
                                'visitDate',
                                'action']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private announcementsService: AnnouncementsService,
              private visitService: VisitsService, 
              public dialog: MatDialog) 
  {
    this.dataSource = new MatTableDataSource()
  }

    ngOnInit(): void {
    this.ownerId = JSON.parse(localStorage.getItem('user')).id;
    this.visitService.getMyvisits(this.ownerId).subscribe( (data) =>  this.dataSource.data = data as any[] ) 
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(announcement: any, visitorId: string): void {
    const dialogRef = this.dialog.open(CreateContractDialog, {
      width: '300px',
      data: {buyerId: visitorId,
             announcementId: announcement._id,
             announcementType: announcement.type_ann,
             beginDate: "",
             duration: "",
             dealPrice: ""}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createContract(id: string){

  }

  public applyFilter = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }
}


@Component({
  selector: 'create-contract-dialog',
  templateUrl: 'create-contract-dialog.html',
  styleUrls: ['create-contract-dialog.css']
})
export class CreateContractDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateContractDialog>,
    private visitService: VisitsService,
    private dealService: DealsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitContract(){
    const duration = this.isForRenting() ? this.data.duration : 0;
    const dealInfo = {
      buyerId: this.data.buyerId,
      announcementId: this.data.announcementId,
      beginDate: this.data.beginDate,
      duration: duration,
      dealPrice: this.data.dealPrice,
    }
    this.dealService.postDeal(dealInfo).subscribe( (data) => console.log(data) );
  }

  isForRenting(){
    const query = this.data.announcementType == "rent" || this.data.announcementType == "Rent";
    return query;
  }
}