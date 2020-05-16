import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_model/User/Message';
import { Pageination, PageResult } from 'src/app/_model/User/Pageing/Pagination';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[];
  pagination: Pageination;
  pageIndex: Number = 1;
  pageSize: Number = 10;
  messageContainer = 'unread';

  constructor(private authService: AuthService, private userService: UserService,
    private alertService: AlertService) {

  }

  ngOnInit() {
    this.pagination = {
      currentPage: this.pageIndex,
      pageSize: this.pageSize,
      totalItems: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
    this.loadMessages(this.messageContainer);
  }

  loadMessages(messageContainer: string) {
    this.messageContainer = messageContainer;
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.pageSize, this.messageContainer).subscribe((x: PageResult<Message[]>) => {
        console.log(JSON.stringify(x.result));
        this.messages = x.result;
        this.pagination = x.pagination;
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages(this.messageContainer);
  }

  deleteMessage(message_id: number) {
    this.alertService.Confirm("Are you sure you want to delete this message.", () => {
      this.userService.deleteMessage(message_id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === message_id), 1);
        this.alertService.Success("Message has been deleted.");
      }, error => {
        this.alertService.Error('Failed to delete the message.');
      })
    });
  }

}
