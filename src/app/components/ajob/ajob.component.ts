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
    title: string;
    salary: any;
    jobType: string;
    job: any;
    editMode = false;
  constructor(private router: Router, private route: ActivatedRoute, private jobsService: JobsService)
  {
      
  }

  ngOnInit() 
  {
      this.route.paramMap.subscribe(params => {
         this.id = params.get('id');
         this.jobsService.getAdminJobsByDoc(this.id).subscribe((job) => {
             if(this.job){
                 this.job = job.payload.data();
                 this.title = this.job.title;
                 this.content = this.job.content;
                 this.dateAdded = this.job.date_added;
                 this.location = this.job.location;
                 this.salary = this.job.salary;
                 this.jobType = this.job.type;
             }
         });    
      });
  }
  backToAdmin(){
      this.router.navigate(['/admin']).then(()  =>{

      });
  }
  toggleEditMode(){
      if(this.editMode === false){
          this.editMode = true;
      }else {
          this.editMode = false;
      }
  }
  editJob(){
      this.jobsService.editJob(
          this.id,
          this.title,
          this.content,
          this.dateAdded,
          this.location,
          this.salary,
          this.jobType
      ).then(() => {
          this.router.navigate(['/admin']).then(() => {

          });
      });
  }
  deleteJob(){
    if(confirm('Are you sure you want to delete this job?')){
        this.jobsService.deleteJob(this.id).then(() =>{
            this.router.navigate(['/admin']);
        });
    }
  }
}
