import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_model/User/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/UserServices/user.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getUserPhotoChange=new EventEmitter<string>();

  baseUrl = environment.apiUrl;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  currentMainPhoto:Photo;
  constructor(private authService: AuthService,private userService:UserService,private alertService:AlertService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "user/" + this.authService.decodedToken.nameid + "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 5 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      if(response){
        const res:Photo=JSON.parse(response);
        const photo={
          id:res.id,
          url:res.url,
          date_added:res.date_added,
          discription:res.discription,
          is_main:res.is_main
        }

        this.photos.push(photo);
      }
    }
  }

  setMainPhoto(photo:Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid,photo.id).subscribe(()=>{
      this.alertService.Success("Successfully set to main.");
      this.currentMainPhoto=this.photos.filter(p=>p.is_main === true)[0];
      this.currentMainPhoto.is_main=false;
      photo.is_main=true;
      
      //emit from photo editor to member edit component
      //this.getUserPhotoChange.emit(photo.url);
      this.authService.changeUserPhoto(photo.url);

      //replace localstorage value
      this.authService.currentUser.photo_url=photo.url;
      localStorage.setItem('user',JSON.stringify(this.authService.currentUser));

    },error=>{
      this.alertService.Error(error);
    })
  }

  deleteUserPhoto(photo_id:number){
    this.alertService.Confirm("Are you sure you want to delete this Photo?",()=>{
      this.userService.deleteUserPhoto(this.authService.decodedToken.nameid,photo_id).subscribe(()=>{
        this.photos.splice(this.photos.findIndex(p=>p.id===photo_id),1);
        this.alertService.Success("Photo has been deleted.");
      },error=>{
        this.alertService.Error("Failed to delete the photo.");
      })
    });
  }
}
