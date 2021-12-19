import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { AnnouncementsService } from 'src/app/services/announcements/announcements.service';
import { Announcements } from 'src/app/models/announcements.model';
import { Router } from '@angular/router';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  searchText!: string;
  announcements: Announcements[]

  constructor(private announcementService: AnnouncementsService, private route: Router) { }

  ngOnInit() {
    this.announcementService.getAnnouncements()
    .subscribe( data => this.announcements = data);
  }

  viewItem(announcement: Announcements){
    this.route.navigate(['/market', announcement._id])
  }

  cropDescription(description: string)
  {
    const dots = "...";
    let row = '';
    const text = description;

    let index = 0
    while (index < text.length) {
      row += text.slice(index ,index + 28) + '\n';
      index += 28
    }
    if(row.length > 250)
    {
      // you can also use substr instead of substring
      row = row.substring(0,250) + dots; 
    }

      return row;
  }
}
