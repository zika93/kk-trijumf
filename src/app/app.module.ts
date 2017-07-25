import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { LoginComponent } from './auth/login/login.component';
import { BaseComponent } from './base/base.component';
import { AuthService } from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {PlayerService} from './player-list/player.service';
import { PlayerEditComponent } from './player-list/player/edit-player/edit-player.component';
import { DateValueAccessorDirective } from './shared/date-value-accessor.directive';
import {DatePipe} from '@angular/common';
import { HoverDirective } from './shared/hover.directive';
import { AppDatePipe } from './shared/app-date.pipe';
import {GroupService} from './group-list/group.service';
import { EditGroupComponent } from './group-list/group/edit-group/edit-group.component';
import {CoachService} from './coach/coach.service';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ActivityTypeComponent } from './activity-type/activity-type.component';
import {LoadingService} from './shared/loading.service';
import { ListGroupComponent } from './list-group/list-group.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity/activity.component';
import {ActivityService} from './activity/activity.service';
import { EditActivityComponent } from './activity/edit-activity/edit-activity.component';
import { AddActivityComponent } from './activity/add-activity/add-activity.component';



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
    PointerDirective,
    LoginComponent,
    BaseComponent,
    PlayerEditComponent,
    DateValueAccessorDirective,
    HoverDirective,
    AppDatePipe,
    EditGroupComponent,
    FileUploaderComponent,
    ActivityTypeComponent,
    ListGroupComponent,
    HomeComponent,
    ActivityComponent,
    EditActivityComponent,
    AddActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, PlayerService, DatePipe, GroupService, CoachService, LoadingService, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
