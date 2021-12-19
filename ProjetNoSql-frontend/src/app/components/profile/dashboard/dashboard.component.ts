import { Component, OnInit } from '@angular/core';
import { VisitsService } from 'src/app/services/visits/visits.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ownerId: string
  tableCols = ['visitor.firstname', 'visitor.lastname', 'visitor.phoneNumber', 'visitDate']
  tableData: any[];
  visits: any[];
  constructor(private visitServive: VisitsService) { }

  ngOnInit(): void {
    this.ownerId = JSON.parse(localStorage.getItem('user')).id;
    this.visitServive.getClosestVisits(this.ownerId).subscribe( (data) =>  {
      this.tableData = data
    }) 

  }

}
