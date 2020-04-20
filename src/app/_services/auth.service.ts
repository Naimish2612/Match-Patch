import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../_model/User/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authBaseUrl = environment.apiUrl + 'auth/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  currentUser:User;

  userPhotoUrl=new BehaviorSubject<string>('../../assets/user_photo/default_photo.png');
  currentPhotoUrl=this.userPhotoUrl.asObservable();
  
  constructor(private http: HttpClient) { }

  Login(model: any) {
    return this.http.post(this.authBaseUrl + "Login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token)
          this.currentUser=user.user;
          this.changeUserPhoto(this.currentUser.photo_url);
        }
      })
    );
  }

  SignUp(user: User) {
    return this.http.post(this.authBaseUrl + 'SignUp', user);
  }

  LoggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  //change photo into nav bar 
  changeUserPhoto(photoUrl:string){
    this.userPhotoUrl.next(photoUrl);
  }

}
