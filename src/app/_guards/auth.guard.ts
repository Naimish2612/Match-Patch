import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alertService: AlertService, private route: Router)
  { }

  canActivate(): boolean {
    
    if(this.authService.LoggedIn()){
      return true;
    }

    this.alertService.Error("You shall not pass by value!!!");
    this.route.navigate(['/home']);
    return false;

  }

}
