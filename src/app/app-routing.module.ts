import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupListComponent} from './group-list/group-list.component';
import {UpcomingComponent} from './upcoming/upcoming.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {LoginComponent} from './auth/login/login.component';
import {BaseComponent} from './base/base.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PlayerComponent} from './player-list/player/player.component';
import {AuthGuard} from './auth/auth-guard.service';
import {PlayerEditComponent} from './player-list/player/edit-player/edit-player.component';
import {GroupComponent} from './group-list/group/group.component';
import {EditGroupComponent} from './group-list/group/edit-group/edit-group.component';


const appRoutes: Routes = [
  { path: '',
    children: [
      { path: '', component: UpcomingComponent, pathMatch: 'full' },
      { path: 'groups', component: GroupListComponent },
      { path: 'groups/new', component: EditGroupComponent },
      { path: 'groups/:id/edit', component: EditGroupComponent },
      { path: 'groups/:id', component: GroupComponent },
      { path: 'players', component: PlayerListComponent },
      { path: 'players/new', component: PlayerEditComponent },
      { path: 'players/:id/edit', component: PlayerEditComponent },
      { path: 'players/:id', component: PlayerComponent },
      { path: 'error', component: ErrorPageComponent },

  ],
    canActivate: [AuthGuard],
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
