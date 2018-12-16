import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore)
  {

  }
  
  getJobs(){
      return this.fireStore.collection("jobs").snapshotChanges();
  }
  getAdminUserJobs(id: string){
      return this.fireStore.collection("jobs", ref => ref.where("user_id", "==", id)).snapshotChanges();
  }
  getAdminJobsByDoc(id: string){
      return this.fireStore.collection("jobs").doc(id).snapshotChanges();
  }
  
  addJob(userId : string, title: string, job_type: string, location:string, salary: string, content: string){
      return new Promise((resolve, reject) => {
          this.fireStore.collection('jobs').add({
              title: title,
              content: content,
              date_added: '',
              location: location,
              salary: salary,
              type: job_type,
              user_id: userId
          }).then(() => {
              resolve();
          }).catch(() => {
              reject();
          }); 
      });
  }
  editJob(id: string, title: string, content: string, dateAdded: string, location:string, salary: string, jobType: string){
        return new Promise((resolve, reject) => {
            this.fireStore.collection('jobs').doc(id).update({
                content: content,
                date_added: content,
                location: location,
                salary: salary,
                title: title,
                job_type: jobType
            }).then(() =>{
                resolve();
            }).catch((error) => {
               reject();
            });
        });
  }
  deleteJob(id: string){
      return new Promise((resolve, reject) => {
          this.fireStore.collection('jobs').doc(id).delete().then(function(){
              resolve();
          }).catch(() => {
              reject();
          });
      })
  }
}
