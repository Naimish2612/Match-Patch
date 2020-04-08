import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/User/user';
import { AlertService } from 'src/app/_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/UserServices/user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  user : User;

  constructor(private userService:UserService,private alertService:AlertService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user:User)=>{
      this.user=user;
    },error=>{
      this.alertService.Error(error);
    });
  }

}
