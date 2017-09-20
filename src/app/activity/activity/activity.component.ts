import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Activity} from '../../model/activity.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivityService} from '../activity.service';
import {Player} from '../../model/player.model';
import {isNullOrUndefined} from 'util';
import {DatePipe} from '@angular/common';
import {LOADER} from '../../shared/loading.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {

  public activity: Activity = new Activity(null, null, null, null, null);
  private sub: Subscription;
  private id: number;
  public message: string;
  public players: Player[];
  public checked: boolean[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ActivityService,
              private datepipe: DatePipe) {
  }

  ngOnInit() {
    LOADER.show();
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.onRefresh();
        LOADER.hide();
      }
    );
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.sub)) {
      this.sub.unsubscribe();
    }
  }

  onRefresh() {
    LOADER.show();
    this.ngOnDestroy();
    LOADER.show();
    this.sub = this.service.fetchActivity(this.id).subscribe(
      (activity: Activity) => {
        // console.log(activity);
        this.activity = activity;
        this.service.fetchPlayerActivity(this.id).subscribe(
          (playersActivity: any[]) => {
            this.players = [];
            this.checked = new Array<boolean>();
            for (const pa of playersActivity) {
              this.players.push(new Player([], [], [],
                pa.PlayerId, pa.PlayerName, pa.PlayerMiddleName, pa.PlayerSurname,
                null, null, null, null, null, null, null, null, null, null, pa.PlayerThumbnail));
              this.checked.push(pa.Active === 1);
            }

            LOADER.hide();
          }
        );
        LOADER.hide();
      }
    );
  }
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onStart() {
    LOADER.show();
    this.service.fetchAndCreatePlayerActivity(this.id).subscribe(
      (players: Player[]) => {
        // console.warn(players);
        this.players = players;
        this.checked = new Array<boolean>(this.players.length);
        LOADER.hide();
      }
    );
  }

  onRestart() {
    LOADER.show();
    this.service.restartPlayerActivity(this.id).subscribe(
      (players: Player[]) => {
        // console.warn(players);
        this.players = players;
        this.checked = new Array<boolean>(this.players.length);
        LOADER.hide();
      }
    );
  }

  onActivitySubmit() {
    LOADER.show();
    const list = [];
    let i;
    for (i = 0; i < this.players.length; i++) {
      list.push({
        Key: this.players[i].Id,
        Value: this.checked[i]
      });
    }
    this.service.submitPlayerActivity(this.id, list).subscribe((data) => {
      this.message = 'Submitted on ' + this.datepipe.transform(new Date(), 'HH:mm');
      LOADER.hide();
    });
  }

  isStarted() {
    return !isNullOrUndefined(this.players) && this.players.length !== 0;
  }

}
