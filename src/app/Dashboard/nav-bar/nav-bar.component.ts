import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loginModel :any={}
  photo_url:string;

  constructor(public authService:AuthService,private alertService:AlertService,private route:Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photo_url=>this.photo_url=photo_url);
  }

  Login(){
    this.authService.Login(this.loginModel).subscribe(next=>{
      this.alertService.Success("login successfully.");
      this.route.navigate(['/home']);
    },error=>{
      this.alertService.Error(error);
    })
  }

  LoggedIn(){
    return this.authService.LoggedIn();
  }

  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken=null;
    this.authService.currentUser=null;
    this.alertService.Message("logout");
    this.route.navigate(['/home']);
  }
}
