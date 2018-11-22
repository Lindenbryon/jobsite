import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class RegisterComponent implements OnInit {
    EmailPassword: FormGroup;
    AdditionalInfo: FormGroup;
  constructor(private authService: AuthService, private _formBuilder: FormBuilder, private router: Router) 
  {
      
  }
  ngOnInit() {
    this.EmailPassword = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.AdditionalInfo = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }
      
  
  register(){
      let email = this.EmailPassword.controls.email.value;
      let password = this.EmailPassword.controls.password.value;
      if(email !== "" && password !== ""){
          this.authService.register(email, password);
      }
  }
  // assignInfo(){
  // 
  //     let firstname = this.AdditionalInfo.controls.firstname.value;
  //     let lastname = this.AdditionalInfo.controls.lastname.value;
  //     if(firstname !== "" && lastname !== ""){
  //         this.fbAuth.assignInfo(firstname, lastname).then(() => {
  //             this.router.navigate([ '/home' ]);
  //         });
  //     }
  // }
  
}
