import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_model/User/user';
import { AlertService } from 'src/app/_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  user_id: number;
  constructor(private userService: UserService, private alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user_id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe(param => {
      const selectedTab = param['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.user_id).subscribe((user: User) => {
      this.user = user;
      this.galleryOptions = [{
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }];

      this.galleryImages = this.getImage();
    }, error => {
      this.alertService.Error(error);
    });
  }

  getImage() {
    const imageURL = [];
    for (const photo of this.user.photos) {
      imageURL.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.discription
      })
    }

    return imageURL;
  }

  selectTab(tab_id: number) {
    this.memberTabs.tabs[tab_id].active = true;
  }

}
