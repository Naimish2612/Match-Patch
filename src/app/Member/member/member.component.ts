import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/User/user';
import { AlertService } from 'src/app/_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  user : User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService:UserService,private alertService:AlertService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.loadUser();
  }

  

  loadUser(){
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user:User)=>{
      this.user=user;
      this.galleryOptions=[{
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }];
  
      this.galleryImages=this.getImage();
    },error=>{
      this.alertService.Error(error);
    });
  }

  getImage(){
    const imageURL=[];
    for (const photo of this.user.photos) {
      imageURL.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url,
        description:photo.discription
      })
    }

    return imageURL;
  }

}
