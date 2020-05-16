import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './Member/member/member.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { MessageListComponent } from './Message/message-list/message-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberEditComponent } from './Member/member-edit/member-edit.component';
import { PreventUnsaveChanges } from './_guards/prevent-unsave-changes.guards';
import { MemberLikeListComponent } from './Member/member-like-list/member-like-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: "member/edit", component: MemberEditComponent,canDeactivate:[PreventUnsaveChanges] },
      { path: "member/list", component: MemberListComponent },
      { path: "member/like/list", component: MemberLikeListComponent },
      { path: "member/:id", component: MemberComponent },
      { path: "messages", component: MessageListComponent }]
  },
  { path: "**", redirectTo: '', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
