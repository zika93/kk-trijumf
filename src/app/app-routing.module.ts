import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupListComponent} from './group-list/group-list.component';
import {UpcomingComponent} from './upcoming/upcoming.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {LoginComponent} from './auth/login/login.component';
import {BaseComponent} from './base/base.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PlayerComponent} from './player-list/player/player.component';


const appRoutes: Routes = [
  { path: '',
    children: [
      { path: '', component: UpcomingComponent, pathMatch: 'full' },
      { path: 'groups', component: GroupListComponent },
      { path: 'players', component: PlayerListComponent },
      { path: 'players/:id', component: PlayerComponent },
      { path: 'error', component: ErrorPageComponent },

  ],
    /*canActivate: [AuthGuard],*/
    component: BaseComponent},
  { path: 'login', component: LoginComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class  AppRoutingModule {

}
