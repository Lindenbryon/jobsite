import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    email: string = null;
    password: string = null;
  constructor(private authService: AuthService) 
  {
      
  }
  ngOnInit() 
  {
      
  }
  register()
  {
      this.authService.register(this.email, this.password).then((user) => {
         //redirect
      });
  }
}
