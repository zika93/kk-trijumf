import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupListComponent} from './group-list/group-list.component';
import {UpcomingComponent} from './upcoming/upcoming.component';
import {PlayerListComponent} from './player-list/player-list.component';


const appRoutes: Routes = [
  { path: '', component: UpcomingComponent, pathMatch: 'full' },
  { path: 'groups', component: GroupListComponent },
  { path: 'players', component: PlayerListComponent },
  { path: '**', component: PlayerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class  AppRoutingModule {

}
