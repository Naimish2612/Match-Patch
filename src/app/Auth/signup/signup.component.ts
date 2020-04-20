import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDaterangepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/app/_model/User/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() signUpValue: any;
  @Output() resetSignUpMode = new EventEmitter();
  bs_date_config: Partial<BsDaterangepickerConfig>;

  signUpModel: User;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private alertService: AlertService, private fb: FormBuilder,
    private route: Router) { }

  ngOnInit() {

    //date picker theme
    this.bs_date_config = { containerClass: 'theme-blue' };

    //using formbuilder
    this.createSignUpForm();

    //using formGroup 
    // this.signupForm = new FormGroup({
    //   user_name: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    //   confirm_password: new FormControl('', Validators.required)
    // },this.passwordValidator);
  }

  createSignUpForm() {
    this.signupForm = this.fb.group({
      gender: ['male'],
      user_name: ['', Validators.required],
      known_as: ['', Validators.required],
      date_of_birth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordValidator });
  }

  passwordValidator(form: FormGroup) {
    return form.get("password").value === form.get("confirm_password").value ? null : { 'mismatch': true };
  }


  SignUp() {
    if (this.signupForm.valid) {
      this.signUpModel = Object.assign({}, this.signupForm.value);
      this.authService.SignUp(this.signUpModel).subscribe(() => {
        this.alertService.Message("Registration Successful.");
      }, error => {
        this.alertService.Error(error);
      }, () => {
        this.authService.Login(this.signUpModel).subscribe(() => {
          this.route.navigate(["member/list"]);
        }, error => {
          this.alertService.Error(error);
        })
      });
    }
  }

  Reset() {
    this.resetSignUpMode.emit(false);
  }

}
