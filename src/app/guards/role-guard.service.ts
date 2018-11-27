import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'; 
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) 
  {
      
  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve) => {
          this.authService.observe.subscribe((userDetails) => {
              if (userDetails.payload.data().userType === "admin") {
                  resolve(true);
              }
              else
              {
                  this.router.navigate(['/login']);
                  resolve(false);
              }
          });
      });
 }
}
