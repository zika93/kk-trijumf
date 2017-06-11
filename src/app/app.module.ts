import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group-list/group/group.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerComponent } from './player-list/player/player.component';
import { UpcomingComponent } from './upcoming/upcoming.component';


const appRoutes: Routes = [
  { path: '', component: UpcomingComponent },
  { path: 'grupe', component: GroupListComponent },
  { path: 'igraci', component: PlayerListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GroupListComponent,
    GroupComponent,
    PlayerListComponent,
    PlayerComponent,
    UpcomingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
