import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpModel: any = {};

  @Input() signUpValue: any;
  @Output() resetSignUpMode = new EventEmitter();

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  SignUp() {
    this.authService.SignUp(this.signUpModel).subscribe(()=>{
      console.log("SignUp Done.");
    },error=>{
      console.log("SignUp Error.");
    });
  }

  Reset() {
    this.resetSignUpMode.emit(false);
  }

}
