import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { JobsService } from '../../services/jobs/jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
    addJob: FormGroup;
    userId = null;
  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, private jobsService: JobsService)
  {
      this.auth.user.subscribe((user) => {
         this.userId = user.uid;
      });
  }

  ngOnInit()
  {
      this.addJob = this.fb.group({
          title: ['', Validators.required],
          job_type: ['', Validators.required],
          location: ['', Validators.required],
          salary: ['', Validators.required],
          content: ['', Validators.required],
      });
  }
  postNewJob(){
      
      let title = this.addJob.controls.title.value;
      let job_type = this.addJob.controls.job_type.value;
      let location = this.addJob.controls.location.value;
      let salary = this.addJob.controls.salary.value;
      let content = this.addJob.controls.title.value;
      
      if(this.userId){
          this.jobsService.addJob(this.userId, title, job_type, location, salary, content).then((addedJob) => {
              //job saved 
          }, (error) => {
              //return error to view
              console.error("FAILED");
          });  
      }
      
  }

}
