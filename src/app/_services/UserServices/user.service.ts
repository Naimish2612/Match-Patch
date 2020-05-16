import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_model/User/user';
import { PageResult } from 'src/app/_model/User/Pageing/Pagination';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/_model/User/Message';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(pageIndex?, pageSize?, userParams?, likeParams?): Observable<PageResult<User[]>> {

    const pageResult: PageResult<User[]> = new PageResult<User[]>();

    //add header in request
    let params = new HttpParams();

    if (pageIndex != null && pageSize != null) {
      params = params.append('pageIndex', pageIndex);
      params = params.append('pageSize', pageSize);
    }

    if (userParams != null) {
      params = params.append('min_age', userParams.min_age);
      params = params.append('max_age', userParams.max_age);
      params = params.append('gender', userParams.gender);
    }

    if (likeParams === "Likers")
      params = params.append("likers", "true");
    if (likeParams === "Likees")
      params = params.append("likees", "true");

    return this.http.get<User[]>(this.baseUrl + 'user', { observe: 'response', params })
      .pipe(
        map(response => {
          pageResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            pageResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return pageResult;
        })
      );
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

  sendLike(user_id: number, recipient_id: number) {
    return this.http.post(this.baseUrl + "user/" + user_id + "/like/" + recipient_id, {});
  }

  getMessages(user_id: number, pageIndex?, pageSize?, messageContainer?): Observable<PageResult<Message[]>> {

    const messageResult: PageResult<Message[]> = new PageResult<Message[]>();
    let params = new HttpParams();

    params = params.append("message_container", messageContainer);

    if (pageIndex != null && pageSize != null) {
      params = params.append('pageIndex', pageIndex);
      params = params.append('pageSize', pageSize);
    }

    return this.http.get<Message[]>(this.baseUrl + "user/" + user_id + "/messages", { observe: 'response', params })
      .pipe(
        map(response => {
          messageResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            messageResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return messageResult;
        })
      );


  }

  getMessageThread(user_id: number, recipient_id: number) {
    return this.http.get<Message[]>(this.baseUrl + "user/" + user_id + "/messages/thread/" + recipient_id);
  }

  sendMessageToUser(user_id: number, message: Message) {
    return this.http.post(this.baseUrl + "user/" + user_id + "/messages", message);
  }

  deleteMessage(message_id: number, user_id: number) {
    return this.http.post(this.baseUrl + "user/" + user_id + "/messages/" + message_id, {});
  }

  markMessageAsRead(message_id: number, user_id: number) {
    return this.http.post(this.baseUrl + "user/" + user_id + "/messages/" + message_id + "/read", {}).subscribe();
  }

}
