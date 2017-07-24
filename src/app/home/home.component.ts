import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../model/group.model';
import {CoachService} from '../coach/coach.service';
import {Subscription} from 'rxjs/Subscription';
import {Activity} from '../model/activity.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  private groups;
  private upcoming;
  private subGroups: Subscription;
  private subUpcoming: Subscription;
  constructor(private service: CoachService) { }

  ngOnInit() {
    this.subGroups = this.service.getGroups(1).subscribe(
      (groups: Group[]) => {
        console.log(groups);
        this.groups = groups;
      }
    );
    this.subUpcoming = this.service.getUpcoming(1).subscribe(
      (upcoiming: Activity[]) => {
        console.log(upcoiming);
        this.upcoming = upcoiming;
      }
    );
  }

  ngOnDestroy(): void {
    this.subGroups.unsubscribe();
    this.subUpcoming.unsubscribe();
  }

}
