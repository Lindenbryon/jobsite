import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'admin-job',
  templateUrl: './admin-job.component.html',
  styleUrls: ['./admin-job.component.css']
})
export class AdminJobComponent implements OnInit {
    @Input() adminJobs : any;
    jobData: any;
    docId: string;
    content : string;
    dateAdded : any;
    location: string;
    salary: any;
    jobType: string;
    userId :string;
    
  constructor(private authService: AuthService, private router: Router) 
  {
      
  }

  ngOnInit() 
  {
      this.docId = this.adminJobs.payload.doc.id;
      this.jobData = this.adminJobs.payload.doc.data();
      this.content = this.jobData.content;
      this.dateAdded = '';
      this.location = this.jobData.location;
      this.salary = this.jobData.salary;
      this.jobType = this.jobData.type;
  }
  edit(){
      this.router.navigate(['/admin/job', this.docId]);
  }
}
