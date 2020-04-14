import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { User } from 'src/app/_model/User/user';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  user: User;

  @HostListener('window:beforeunload', ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty)
      $event.returnValue = true;
  }

  constructor(private alertService: AlertService, private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    //console.log(this.authService.decodedToken.nameid);
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertService.Error(error);
    });
  }

  updateUserProfile() {

    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertService.Success("User profile update Successfully.");
      this.editForm.reset(this.user);
    }, error => {
      this.alertService.Error(error);
    });


  }

}
