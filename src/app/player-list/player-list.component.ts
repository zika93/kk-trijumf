import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from './player.service';
import {Player} from '../model/player.model';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {Values} from '../shared/static/values';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  players: Player[];

  subPlayers: Subscription;
  constructor(private service: PlayerService) {
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
    this.subPlayers = this.service.getAll().subscribe(
      (players: Player[]) => {
        console.log(players);
        this.players = players;
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subPlayers)) {
      this.subPlayers.unsubscribe();
    }
  }

}
