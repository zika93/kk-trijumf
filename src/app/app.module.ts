import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group-list/group/group.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerComponent } from './player-list/player/player.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { HeadingNavComponent } from './heading/heading-nav/heading-nav.component';
import { PointerDirective } from './shared/pointer.directive';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GroupListComponent,
    GroupComponent,
    PlayerListComponent,
    PlayerComponent,
    UpcomingComponent,
    ErrorPageComponent,
    DropdownDirective,
    HeadingNavComponent,
    PointerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
