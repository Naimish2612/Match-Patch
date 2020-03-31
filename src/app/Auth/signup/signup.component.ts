import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpModel: any = {};

  @Input() signUpValue: any;
  @Output() resetSignUpMode = new EventEmitter();

  constructor(private authService:AuthService,private alertService:AlertService) { }

  ngOnInit() {
  }

  SignUp() {
    this.authService.SignUp(this.signUpModel).subscribe(()=>{
      this.alertService.Message("SignUp Done.");
    },error=>{
      this.alertService.Error(error);
    });
  }

  Reset() {
    this.resetSignUpMode.emit(false);
  }

}
