import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email:  null;
    password: null;
  constructor(private authService: AuthService, private router: Router) 
  {
      
  }

  ngOnInit() 
  {
      
  }
  login(){
      this.authService.login(this.email, this.password).then((user) => {
          this.router.navigate(['/home']);
      });
  }
  
}
