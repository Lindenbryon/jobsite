import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
    public user: Observable<firebase.User>;
    public dbUser: Observable<any>;
    public userDetails: User = null;
    
    uid: any;
    email: any;
    registering: Boolean = false;
    public observe: Observable<any>;
    
  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) 
  {
      this.user = fireAuth.authState;
      this.observe = this.user.pipe(mergeMap((user) => {
          if(user && user.uid)
          {
              return this.fireStore.collection('users').doc(user.uid).snapshotChanges();
          }
          return [];
      }));
  }
  
  get loggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  
  get currentUser() 
  {
      return this.userDetails;
  }
  userType(){
      return this.userDetails;
  }
  
  register(email: string, password: string){
      return new Promise((resolve, reject) => {
         this.fireAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password).then((userCredentials) =>{
             console.log(userCredentials);
             this.uid = userCredentials.user.uid;
             this.email = userCredentials.user.email;
             // this.fireAuth.auth.signOut();
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
                    
          //Publish to firebase
          let userRef = this.fireStore.collection<User>('users');
          userRef.doc(this.uid).set(user);
          resolve();
      });
  }
  login(email: string, password: string)
  {
      return new Promise((resolve, reject) => {
          this.fireAuth.auth.signInWithEmailAndPassword(email, password).then((userObj) => {
              // this.user = userObj;
              let doc = this.fireStore.collection<User>('users').doc(userObj.user.uid);
              doc.ref.get().then((document) => {
                  let data = document.data();
                  this.uid = userObj.user.uid;
                  let user = {} as User;
                  user.email = data.email;
                  user.firstname = data.firstname;
                  user.lastname = data.lastname;
                  
                  resolve(this.user);
              });
          }).catch((error) => {
              reject(error);
          });
      })
  }
  logout()
  {
      return new Promise((resolve, reject) => {
          this.fireAuth.auth.signOut().then(function(signOutObject) {
              resolve();
          }).catch(function(error) {
              reject(error);
          });
      });
  }
}

