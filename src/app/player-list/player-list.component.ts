import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from './player.service';
import {Player} from '../model/player.model';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {Values} from '../shared/static/values';
import {LoadingService} from '../shared/loading.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  players: Player[];

  subPlayers: Subscription;
  constructor(private service: PlayerService, private loader: LoadingService) {
  }

  onRefresh() {
    this.ngOnDestroy();
    this.subPlayers = this.service.fetchAllPlayers().subscribe(
      (players: Player[]) => {
        console.log(players);
        this.players = players;
      }
    );
  }

  ngOnInit() {
    this.subPlayers = this.service.fetchAllPlayers().subscribe(
      (players: Player[]) => {
        // console.log(players);
        this.players = players;
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subPlayers)) {
      this.subPlayers.unsubscribe();
    }
  }

  checkPlayerMedical(index: number) {
    const player = this.players[index];
    if (!isNullOrUndefined(player.Medical)) {
      const date = new Date();
      const newDate = new Date(date.setTime( date.getTime() + Values.dayToWarnForMedic * 86400000 ));
      const expireDate = new Date(player.Medical);
      expireDate.setMonth(expireDate.getMonth() + 6);
      return newDate > expireDate;
    } else {
      return null;
    }
  }


  checkPlayerFees(index: number) {
    const player: Player = this.players[index];
    if (!isNullOrUndefined(player.Fees)) {
      const latestFee = Math.max.apply(Math, player.Fees.map(function (o) {
          return o.Month;
        })
      );
      const date = new Date();
      const month = date.getMonth() + 1;
      const since = new Date(player.Since);
      since.setDate(since.getDate() + 7);
      if (date > since) {
        if (date.getDate() > Values.dayToWarnForFees) {
          return !(latestFee % 100 === month);
        } else {
          return !(latestFee % 100 === month - 1);
        }
      } else {
        return false;
      }
    } else {
      const date = new Date();
      const since = new Date(player.Since);
      since.setDate(since.getDate() + 7);
      return date > since;
    }
  }
}
