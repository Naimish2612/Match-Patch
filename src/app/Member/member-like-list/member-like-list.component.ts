import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';
import { PageResult, Pageination } from 'src/app/_model/User/Pageing/Pagination';
import { User } from 'src/app/_model/User/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-like-list',
  templateUrl: './member-like-list.component.html',
  styleUrls: ['./member-like-list.component.css']
})
export class MemberLikeListComponent implements OnInit {

  users: User[];
  pagination: Pageination;
  likesParam: string;
  constructor(private userService: UserService, private authService: AuthService, private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
    this.likesParam = "Likers";
    this.loadUsers(this.likesParam);
  }

  loadUsers(likesParam?: string) {
    // console.log(this.likesParam);
    this.likesParam = likesParam == "" ? "Likers" : likesParam;
    this.userService.getUsers(this.pagination.currentPage, this.pagination.pageSize, null, this.likesParam)
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
  }

}
