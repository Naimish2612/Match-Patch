import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loginModel :any={
    
  }

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  Login(){
    this.authService.Login(this.loginModel).subscribe(next=>{
      console.log("login successfully.");
    },error=>{
      console.log(error);
    })
  }

  LoggedIn(){
    const token=localStorage.getItem("token");
    return !!token;
  }

  Logout(){
    localStorage.removeItem("token");
    console.log("logout");
  }
}
