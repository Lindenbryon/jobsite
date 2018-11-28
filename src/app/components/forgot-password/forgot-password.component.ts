import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  email: string = null;
  resetMessage: string = null;
  constructor(private router: Router, private authService: AuthService) 
  {
      
  }

  ngOnInit() 
  {
      
  }
  resetPassword(){
      this.authService.resetPassword(this.email).then((rObject) =>{
          this.resetMessage = "Password reset email sent successfully";
     }, (error) => {
         this.resetMessage = error.message
     });
  }

}
