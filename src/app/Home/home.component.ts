import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home_data:any;
  
  signUpMode=false;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    //this.getValues();
  }

  getValues(){
    this.http.get('http://localhost:30911/api/home').subscribe(response=>{
      this.home_data=response;
      console.log("test data :"+this.home_data);
    },error=>{
      console.log(error);
    });
  }

  signUpToggel(){
    this.signUpMode=true;
  }

  resetSignUpModeValue(signUpMode:boolean){
    this.signUpMode=signUpMode;
  }

}
