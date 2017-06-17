import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupListComponent} from './group-list/group-list.component';
import {UpcomingComponent} from './upcoming/upcoming.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {LoginComponent} from './auth/login/login.component';
import {BaseComponent} from './base/base.component';
import {AuthGuard} from './auth/auth-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';


const appRoutes: Routes = [
  { path: '',
    children: [
      { path: '', component: UpcomingComponent },
      { path: 'groups', component: GroupListComponent },
      { path: 'players', component: PlayerListComponent },
  ],
    canActivate: [AuthGuard],
    component: BaseComponent},
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class  AppRoutingModule {

}
