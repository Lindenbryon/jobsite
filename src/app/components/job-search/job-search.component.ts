import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs/jobs.service';

@Component({
  selector: 'job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
    job_title: string = null;
    location: string = null;
    jobs: any = null;


  constructor(private jobService: JobsService)
  {

  }

  ngOnInit()
  {

  }
  search(){
      return this.jobService.getJobs().subscribe((data) => {
          //elastic search
      });
  }

}
