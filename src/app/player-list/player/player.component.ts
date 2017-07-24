import {Component, OnDestroy, OnInit} from '@angular/core';

import {Player} from '../../model/player.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayerService} from '../player.service';
import {Subscription} from 'rxjs/Subscription';
import {Values} from '../../shared/static/values';
import {Fee} from '../../model/fee.model';
import {Group} from '../../model/group.model';
import {LoadingService} from '../../shared/loading.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  sub: Subscription;

  player: Player = new Player(
    [], [], [], null, '', '', '', null, null, null, null, null, '', '', '', '');
  // new Player([], [], [], [], null, '', '', '', null, null, null, null);
  id: number;
  imgUrl = Values.userImage;

  isCollapsedGroups = false;
  isCollapsedFees = false;
  isCollapsedActivity = false;

  toggleCollapseGroups() {
    this.isCollapsedGroups = !this.isCollapsedGroups;
  }

  toggleCollapseFees() {
    this.isCollapsedFees = !this.isCollapsedFees;
  }

  toggleCollapseActivity() {
    this.isCollapsedActivity = !this.isCollapsedActivity;
  }


  constructor(private route: ActivatedRoute,
              private service: PlayerService,
              private router: Router,
              private loader: LoadingService) {
  }

  ngOnInit() {
    // this.loader.loading.next(LoadingService.START_LOADING);
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.sub = this.service.fetchPlayer(this.id).subscribe(
          (player: Player) => {
            console.log(player);
            player.Birthday = new Date(player.Birthday);
            this.player = player;
            if (this.player.Picture !== null) {
              this.imgUrl = this.player.Picture;
            }
            // this.loader.loading.next(false);
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRefresh() {
    // this.loader.loading.next(LoadingService.START_LOADING);
    this.sub = this.service.fetchPlayer(this.id).subscribe(
      (player: Player) => {
        console.log(player);
        player.Birthday = new Date(player.Birthday);
        this.player = player;
        if (this.player.Picture !== null) {
          this.imgUrl = this.player.Picture;
        }
        // this.loader.loading.next(LoadingService.STOP_LOADING);
      }
    );
  }

  addFee() {
    console.log('add feeee');
  }

  refreshFee() {
    console.log('refresh feeee');
    this.service.fetchPlayerFees(this.id).subscribe(
      (param: Params) => {
        this.player.Fees = <Fee[]>param;
      }
    );
  }

  refreshGroups() {
    // players/getgroups/{playerId}
    this.service.fetchPlayerGroups(this.id).subscribe(
      (param: Params) => {
        console.log(param);
        this.player.Groups = <Group[]>param;
      }
    );
  }

}
