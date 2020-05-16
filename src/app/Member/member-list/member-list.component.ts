import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/User/user';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { PageResult, Pageination } from 'src/app/_model/User/Pageing/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  pagination: Pageination;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderDropdown = [{ value: "male", dispaly: "Male" }, { value: "female", dispaly: "Female" }];
  userParams: any = {};

  pageIndex: Number = 1;
  pageSize: Number = 5;
  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.min_age = 18;
    this.userParams.max_age = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.pageSize,this.userParams)
    .subscribe((users: PageResult<User[]>) => {
      this.users = users.result;
      this.pagination = users.pagination;
    }, error => {
      this.alertService.Error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    //console.log(this.pagination.currentPage);
  }

  resetFilter(){
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.min_age = 18;
    this.userParams.max_age = 99;
    this.loadUsers();
  }


}
