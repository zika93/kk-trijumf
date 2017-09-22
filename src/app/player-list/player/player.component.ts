import {Component, OnDestroy, OnInit} from '@angular/core';

import {Player} from '../../model/player.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayerService} from '../player.service';
import {Subscription} from 'rxjs/Subscription';
import {Values} from '../../shared/static/values';
import {Fee} from '../../model/fee.model';
import {Group} from '../../model/group.model';
import {LOADER, LoadingService} from '../../shared/loading.service';
import {HttpHelper} from '../../shared/http-helper';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  sub: Subscription;

  monthList = Values.months;
  player: Player = new Player(
    [], [], [], null, '', '', '', null, null, null, null, null, null, null, '', '', '', '');
  // new Player([], [], [], [], null, '', '', '', null, null, null, null);
  id: number;
  imgUrl = 'assets/img/user.svg';

  isCollapsedGroups = false;
  isCollapsedFees = false;
  isCollapsedActivity = false;

  addingFee = false;

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
    LOADER.show();
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.onRefresh();
      }
      , HttpHelper.handleErrorObservable);
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
    LOADER.display(LoadingService.START_LOADING);
    this.sub = this.service.fetchPlayer(this.id).subscribe(
      (player: Player) => {
        // console.log(player);
        player.Birthday = new Date(player.Birthday);
        this.player = player;
        if (this.player.Picture !== null) {
          this.imgUrl = this.player.Picture;
        }
        LOADER.display(LoadingService.STOP_LOADING);
      });
  }

  submitFee() {
    this.refreshFee();
  }

  addFee() {
    this.addingFee = true;
  }

  cancelAddFee() {
    this.addingFee = false;
  }

  refreshFee() {
    // console.log('refresh feeee');
    LOADER.show();
    this.service.fetchPlayerFees(this.id).subscribe(
      (param: Params) => {
        this.player.Fees = <Fee[]>param;
        this.cancelAddFee();
        LOADER.hide();
      });
  }

  refreshGroups() {
    // players/getgroups/{playerId}
    this.service.fetchPlayerGroups(this.id).subscribe(
      (param: Params) => {
        // console.log(param);
        this.player.Groups = <Group[]>param;
      }
    );
  }

  latestFee() {
    const latestFee = Math.max.apply(Math, this.player.Fees.map(function (o) {
        return o.Month;
      })
    );
    return latestFee % 100;
  }

  getFeeMonth (feeMonth: number) {
    return this.monthList[(feeMonth % 100) - 1];
  }
}
