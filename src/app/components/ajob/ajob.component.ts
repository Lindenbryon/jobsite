import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JobsService } from '../../services/jobs/jobs.service';

@Component({
  selector: 'app-ajob',
  templateUrl: './ajob.component.html',
  styleUrls: ['./ajob.component.css']
})
export class AjobComponent implements OnInit {
    id: string;
    content : string;
    dateAdded : any;
    location: string;
    salary: any;
    jobType: string;
    job: any;
  constructor(private router: Router, private route: ActivatedRoute, private jobsService: JobsService) 
  {
      
  }

  ngOnInit() 
  {
      this.route.paramMap.subscribe(params => {
         this.id = params.get('id');
         this.jobsService.getAdminJobsByDoc(this.id).subscribe((job) => {
             this.job = job.payload.data();
             this.content = this.job.content;
             this.dateAdded = this.job.date_added;
             this.location = this.job.location;
             this.salary = this.job.salary;
             this.jobType = this.job.type;
         });
      });
  }
  backToAdmin(){
      this.router.navigate(['/admin']);
  }

}
