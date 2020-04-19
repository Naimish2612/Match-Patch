import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_model/User/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user');
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + "user/" + user_id);
  }

  updateUser(user_id: number, user: User) {
    return this.http.put(this.baseUrl + "user/" + user_id, user);
  }

  setMainPhoto(user_id: number, photo_id: number) {
    return this.http.post(this.baseUrl + "user/" + user_id + "/photos/" + photo_id + "/setMainPhoto", {})
  }

  deleteUserPhoto(user_id: number, photo_id: number) {
    return this.http.delete(this.baseUrl + "user/" + user_id + "/photos/" + photo_id);
  }
}
