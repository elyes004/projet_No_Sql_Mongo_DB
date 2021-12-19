import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  ownerId: string
  tableCols = ['firstname', 'lastname', 'phoneNumber', 'announcementTitle' ,'beginDate', 'duration', 'dealPrice']
  tableData: any[];
  constructor(private userSerive: UsersService) { }

  ngOnInit(): void {
    this.ownerId = JSON.parse(localStorage.getItem('user')).id;
    this.userSerive.getMyDeals(this.ownerId).subscribe( (data) =>  {
      this.tableData = data;
      console.log("this.tableData")  
      console.log(this.tableData)
      console.log("this.tableData")  

    } ) 
  }
  
}