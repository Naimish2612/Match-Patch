import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authBaseUrl = "http://localhost:30911/api/auth/";
  constructor(private http: HttpClient) { }

  Login(model: any) {
    return this.http.post(this.authBaseUrl + "Login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
        }
      })
    );
  }

  SignUp(model: any) {
    return this.http.post(this.authBaseUrl + 'SignUp', model);
  }

}
