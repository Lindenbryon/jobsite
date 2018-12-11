import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs/jobs.service';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    userId = null;
    adminJobs = null;
  constructor(private auth: AuthService, private jobService: JobsService, private router: Router) 
  {
      this.auth.user.subscribe((user) => {
         this.userId = user.uid;
      });
  }

  ngOnInit() 
  {
      this.jobService.getAdminUserJobs(this.userId).subscribe((jobs) =>{
         this.adminJobs = jobs;
      });
  }
  edit(){
      //this.router.navigate([''])
  }

}
