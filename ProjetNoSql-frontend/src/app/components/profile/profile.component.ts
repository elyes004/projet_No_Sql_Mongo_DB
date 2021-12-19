import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation?.classList.toggle('active');
    toggle?.classList.toggle('active');
  }
  
  onLogOut(){
    this.auth.logout();
    this.router.navigate(['/signin']);
    return false;
  }
}
