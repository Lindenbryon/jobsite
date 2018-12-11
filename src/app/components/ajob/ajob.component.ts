import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JobsService } from '../../services/jobs/jobs.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    title: string;
    salary: any;
    jobType: string;
    job: any;
    editMode = false;
    editJobForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private jobsService: JobsService, private formBuilder: FormBuilder) 
  {
      
  }

  ngOnInit() 
  {
      this.route.paramMap.subscribe(params => {
         this.id = params.get('id');
         this.jobsService.getAdminJobsByDoc(this.id).subscribe((job) => {
             this.job = job.payload.data();
             this.title = this.job.title;
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
  toggleEditMode(){
      if(this.editMode === false){
          this.editMode = true;
      }else {
          this.editMode = false;
      }
  }
  editJob(){
      
  }

}
