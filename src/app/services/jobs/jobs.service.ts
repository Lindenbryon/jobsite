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
  addjob(){
      
  }
}
