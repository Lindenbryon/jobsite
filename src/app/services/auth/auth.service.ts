import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User { 
    email: string;
    firstname: string;
    lastname: string;
    address: string;
    dob: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
user: any;
authState;
uid: any;
registering: any;
email: string;
  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) 
  {
      // this.authState = fireAuth.authState;
      // this.authState.subscribe((response) => {
      //     console.log("response", response);
      //    if(response !== null){
      //        this.email = response.email;
      //        this.uid = response.uid;
      //        this.fireStore.collection('users').doc(response.uid).snapshotChanges().subscribe((user) => {
      //            this.user = <User>user.payload.data();
      //        });
      //    }else {
      //        //remove user
      //    }
      // });
      
  }
  register(email: string, password: string){
      return new Promise((resolve, reject) => {
         this.fireAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password).then((userCredentials) =>{
             console.log(userCredentials);
             this.uid = userCredentials.user.uid;
             this.email = userCredentials.user.email;
             this.fireAuth.auth.signOut();
         }); 
      });
  }
  assignInfo(firstname: string, lastname: string, address: string, dob: string)
  {
      this.registering = false;
      return new Promise((resolve, reject) =>{
          // Set Local User Object
          let user = {} as User;
          user.email = this.email;
          user.firstname = firstname;
          user.lastname = lastname;
          user.address = address;
          user.dob = dob;
          this.user = user;
          
          console.log(this.uid);            
          //Publish to firebase
          let users = this.fireStore.collection<User>('users');
          users.doc(this.uid).set(user);
          resolve();
      });
  }
  logout()
  {
      this.fireAuth.auth.signOut().then(function() {
          // Sign-out successful.
      }).catch(function(error) {
          // An error happened.
      });
  }
}
