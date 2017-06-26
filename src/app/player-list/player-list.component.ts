import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from "./player.service";
import {Player} from "../model/player.model";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  players: Player[];

  subPlayers: Subscription;

  constructor(private service: PlayerService) { }

  ngOnInit() {
    this.subPlayers = this.service.getAll().subscribe(
      (players: Player[]) => {
        console.log(players);
        this.players = players;
        // this.service.setPlayers(players);
      }
    );
  }

  ngOnDestroy(): void {
    this.subPlayers.unsubscribe();
  }

}
