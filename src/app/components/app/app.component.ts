import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from '../../services/auth/auth.service';
import { fadeAnimation } from '../../animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
  host: {
      class: 'router-body'
  }
})
export class AppComponent {
  title = 'jobs';
  user: any = null;
    constructor(private authService: AuthService, private router: Router)
    {
        this.authService.user.subscribe((user) => {
            if(user !== null)
            {
                this.authService.observe.subscribe((observe) => {
                    this.user = observe.payload.data();
                });
            }
        });
    }
    logout(){
        this.authService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
