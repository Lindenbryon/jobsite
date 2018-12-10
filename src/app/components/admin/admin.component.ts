import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs/jobs.service';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    userId = null;
  constructor(private auth: AuthService, private jobService: JobsService) 
  {
      this.auth.user.subscribe((user) => {
         this.userId = user.uid;
      });
  }

  ngOnInit() 
  {
      
  }

}
