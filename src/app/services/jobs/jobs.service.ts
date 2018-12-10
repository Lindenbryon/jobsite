import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore)
  {

  }

  jobSearch(){

  }
  
  getJobs(){
      return this.fireStore.collection("jobs").snapshotChanges();
  }
  getJobsByUser(id: string){
      return this.fireStore.collection("jobs", ref => ref.where("user_id", "==", id)).snapshotChanges();
  }
  
  addJob(userId : string, title: string, job_type: string, location:string, salary: string, content: string){
      return new Promise((resolve, reject) => {
          this.fireStore.collection('jobs').add({
              content: content,
              date_added: '',
              location: location,
              salary: salary,
              type: '',
              user_ud: userId
          }).then(() => {
              resolve();
          }).catch(() => {
              reject();
          }); 
      });
  }
}
