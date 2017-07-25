import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Activity} from '../../model/activity.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivityService} from '../activity.service';
import {Player} from '../../model/player.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private activity: Activity = new Activity(null,null,null,null,null);
  private sub: Subscription;
  private id: number;

  private players: Player[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ActivityService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.sub = this.service.fetchActivity(this.id).subscribe(
          (activity: Activity) => {
            console.log(activity);
            this.activity = activity;
          }
        );
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});}

  onStart() {}

}
