import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupListComponent} from './group-list/group-list.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {LoginComponent} from './auth/login/login.component';
import {BaseComponent} from './base/base.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PlayerComponent} from './player-list/player/player.component';
import {AuthGuard} from './auth/auth-guard.service';
import {PlayerEditComponent} from './player-list/player/edit-player/edit-player.component';
import {GroupComponent} from './group-list/group/group.component';
import {EditGroupComponent} from './group-list/group/edit-group/edit-group.component';
import {HomeComponent} from './home/home.component';
import {ActivityComponent} from './activity/activity/activity.component';
import {EditActivityComponent} from './activity/edit-activity/edit-activity.component';
import {CoachPageComponent} from './coach/coach-page/coach-page.component';
import {CoachEditComponent} from './coach/coach-edit/coach-edit.component';


const appRoutes: Routes = [
  { path: '',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'groups', component: GroupListComponent },
      { path: 'groups/new', component: EditGroupComponent },
      { path: 'groups/:id/edit', component: EditGroupComponent }, // , canDeactivate: [CanDeactivateGuard]
      { path: 'groups/:id', component: GroupComponent },
      { path: 'activity/:id/edit', component: EditActivityComponent },
      { path: 'activity/:id', component: ActivityComponent },
      { path: 'players', component: PlayerListComponent },
      { path: 'players/new', component: PlayerEditComponent  },
      { path: 'players/:id/edit', component: PlayerEditComponent },
      { path: 'players/:id', component: PlayerComponent },
      { path: 'profile', component: CoachPageComponent},
      { path: 'profile/edit', component: CoachEditComponent},
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
