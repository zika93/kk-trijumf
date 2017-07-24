import { Component, OnInit } from '@angular/core';
import {Activity} from '../model/activity.model';
import {CoachService} from '../coach/coach.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  title = 'Upcoming';

  upcomingArr: Activity[] = [];

  constructor(private service: CoachService) { }

  ngOnInit() {
    this.service.getUpcoming(1).subscribe((data: any) => {
      this.upcomingArr = data;
    });
  }

  private openGroup(id) {
    console.log(id);
  }

}
