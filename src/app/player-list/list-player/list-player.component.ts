import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../model/player.model';
import {isNullOrUndefined} from 'util';
import {Values} from '../../shared/static/values';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrls: ['./list-player.component.css']
})
export class ListPlayerComponent implements OnInit {

  @Input()  players: Player[];

  constructor() { }

  ngOnInit() {
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
