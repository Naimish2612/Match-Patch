import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/User/user';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/UserServices/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertService.Error(error);
    });
  }

}
