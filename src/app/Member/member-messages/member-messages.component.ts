import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Message } from 'src/app/_model/User/Message';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipient_id: number;
  messages: Message[];
  newMessage: any = {};
  constructor(private authService: AuthService, private userService: UserService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.loadMessage();
  }

  loadMessage() {
    const currentUserId=+this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipient_id)
    .pipe(
      tap(msg=>{
        for (let index = 0; index < msg.length; index++) {
          const element = msg[index];
          if(msg[index].is_read===false && msg[index].recipientId===currentUserId){
            this.userService.markMessageAsRead(msg[index].id,currentUserId);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertService.Error(error);
    })
  }

  sendMessage() {
    this.newMessage.recipientid = this.recipient_id;
    this.userService.sendMessageToUser(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((msg: Message) => {
        this.messages.push(msg);
        this.newMessage.content = '';
      }, error => {
        this.alertService.Error(error);
      });
  }

}
