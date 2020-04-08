import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './Member/member/member.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { MessageListComponent } from './Message/message-list/message-list.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
    { path: "member/list", component: MemberListComponent },
    { path: "member/:id", component: MemberComponent },
    { path: "message", component: MessageListComponent }]
  },
  { path: "**", redirectTo: '', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
