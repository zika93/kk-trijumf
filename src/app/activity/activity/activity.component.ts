import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Activity} from '../../model/activity.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivityService} from '../activity.service';
import {Player} from '../../model/player.model';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private activity: Activity = new Activity(null, null, null, null, null);
  private sub: Subscription;
  private id: number;

  private players: Player[];
  private checked: boolean[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ActivityService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.sub = this.service.fetchActivity(this.id).subscribe(
          (activity: Activity) => {
            console.log(activity);
            this.activity = activity;
            this.service.fetchPlayerActivity(this.id).subscribe(
              (playersActivity: any[]) => {
                this.players = [];
                this.checked = new Array<boolean>();
                for (const pa of playersActivity) {
                  this.players.push(new Player([], [], [],
                    pa.PlayerId, pa.PlayerName, pa.PlayerMiddleName, pa.PlayerSurname,
                    null, null, null, null, null, null, null, null, pa.PlayerThumbnail));
                  this.checked.push(pa.Active === 1);
                }

              }
            );
          }
        );
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onStart() {
    this.service.fetchAndCreatePlayerActivity(this.id).subscribe(
      (players: Player[]) => {
        console.warn(players);
        this.players = players;
        this.checked = new Array<boolean>(this.players.length);
      }
    );
  }

  onRestart() {
    this.service.restartPlayerActivity(this.id).subscribe(
      (players: Player[]) => {
        console.warn(players);
        this.players = players;
        this.checked = new Array<boolean>(this.players.length);
      }
    );
  }

  onActivitySubmit() {
    const list = [];
    let i;
    for (i = 0; i < this.players.length; i++) {
      list.push({
        Key: this.players[i].Id,
        Value: this.checked[i]
      });
    }
    this.service.submitPlayerActivity(this.id, list).subscribe((data) => console.log(data));
  }

  isStarted() {
    return !isNullOrUndefined(this.players) && this.players.length !== 0;
  }

}
