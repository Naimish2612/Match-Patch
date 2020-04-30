import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule,TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

//pipes
import{TimeAgoPipe} from 'time-ago-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './Dashboard/nav-bar/nav-bar.component';
import { AuthService } from './_services/auth.service';
import { SignupComponent } from './Auth/signup/signup.component';
import { ErrorInterceptorProvider } from './_services/ErrorHendling/error.interceptor';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { MemberComponent } from './Member/member/member.component';
import { MessageListComponent } from './Message/message-list/message-list.component';
import { MemberCardComponent } from './Member/member-card/member-card.component';
import { MemberEditComponent } from './Member/member-edit/member-edit.component';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/UserServices/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsaveChanges } from './_guards/prevent-unsave-changes.guards';
import { PhotoEditorComponent } from './Member/photo-editor/photo-editor.component';
import { MemberLikeListComponent } from './Member/member-like-list/member-like-list.component';


export function tokenGetter(){
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SignupComponent,
    MemberListComponent,
    MessageListComponent,
    MemberCardComponent,
    MemberComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberLikeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        whitelistedDomains:['localhost:4444'],
        blacklistedRoutes:['localhost:4444/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertService,
    AuthGuard,
    UserService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    PreventUnsaveChanges
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  bootstrap: [AppComponent]
})
export class AppModule { }
