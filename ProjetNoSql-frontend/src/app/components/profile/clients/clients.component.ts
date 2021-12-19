import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  ownerId: string
  tableCols = ['firstname', 'lastname', 'email', 'phoneNumber']
  tableData: User[];
  constructor(private userSerive: UsersService) { }

  ngOnInit(): void {
    this.ownerId = JSON.parse(localStorage.getItem('user')).id;
    this.userSerive.getMyClients(this.ownerId).subscribe( (data) =>  this.tableData = data ) 

  }

}
