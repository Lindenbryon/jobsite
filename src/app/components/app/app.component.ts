import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jobs';
  user: any = null;
    constructor(private authService: AuthService, private router: Router)
    {
        this.authService.user.subscribe((user) => {
            if(user !== null)
            {
                this.authService.dbUser.subscribe(() => {
                    this.user = this.authService.currentUser;
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
