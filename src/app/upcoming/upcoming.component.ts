import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../model/activity.model';
import {CoachService} from '../coach/coach.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  @Input() title = 'Upcoming';

  @Input() upcoming: Activity[] = [];

  constructor() { }

  ngOnInit() {
  }

  private openActivity(id) {
    console.log(id);
  }

  noUpcoming() {
    return isNullOrUndefined(this.upcoming) || this.upcoming.length === 0;
  }
}
