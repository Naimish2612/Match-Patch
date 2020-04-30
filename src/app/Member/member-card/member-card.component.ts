import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_model/User/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  sendLike(recipient_id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, recipient_id).subscribe(data => {
      this.alertService.Success("You have liked: " + this.user.known_as);
    },error=>{
      this.alertService.Error(error);
    })
  }

}
