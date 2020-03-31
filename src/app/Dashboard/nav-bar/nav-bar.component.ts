import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loginModel :any={
    
  }

  constructor(public authService:AuthService,private alertService:AlertService) { }

  ngOnInit() {
  }

  Login(){
    this.authService.Login(this.loginModel).subscribe(next=>{
      this.alertService.Success("login successfully.");
    },error=>{
      this.alertService.Error(error);
    })
  }

  LoggedIn(){
    return this.authService.LoggedIn();
  }

  Logout(){
    localStorage.removeItem("token");
    this.alertService.Message("logout");
  }
}
