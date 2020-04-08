import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authBaseUrl = environment.apiUrl + 'auth/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  Login(model: any) {
    return this.http.post(this.authBaseUrl + "Login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token)
          console.log(this.decodedToken);
        }
      })
    );
  }

  SignUp(model: any) {
    return this.http.post(this.authBaseUrl + 'SignUp', model);
  }

  LoggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

}
