import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogOut(){
    this.auth.logout();
    this.router.navigate(['/signin']);
    return false;
  }

  loggedIn(){
    return this.auth.loggedIn();
  }
}
