import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SignupComponent,
    MemberListComponent,
    MemberComponent,
    MessageListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  bootstrap: [AppComponent]
})
export class AppModule { }
