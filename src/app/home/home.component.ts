import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../model/group.model';
import {CoachService} from '../coach/coach.service';
import {Subscription} from 'rxjs/Subscription';
import {Activity} from '../model/activity.model';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {LOADER} from '../shared/loading.service';
import {HttpHelper} from '../shared/http-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  public groups;
  public upcoming;
  private subGroups: Subscription;
  private subUpcoming: Subscription;
  constructor(private service: CoachService) { }

  ngOnInit() {
    LOADER.show();
    this.subGroups = this.service.getGroups(+Cookie.get('id')).subscribe(
      (groups: Group[]) => {
        // console.log(groups);
        this.groups = groups;
        LOADER.hide();
      }
    , HttpHelper.handleErrorObservable);
    LOADER.show();
    this.subUpcoming = this.service.getUpcoming(+Cookie.get('id')).subscribe(
      (upcoiming: Activity[]) => {
        // console.log(upcoiming);
        this.upcoming = upcoiming;
        LOADER.hide();
      }
      , HttpHelper.handleErrorObservable);
  }

  ngOnDestroy(): void {
    this.subGroups.unsubscribe();
    this.subUpcoming.unsubscribe();
  }

}
