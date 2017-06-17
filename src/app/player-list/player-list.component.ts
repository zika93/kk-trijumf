import { Component, OnInit } from '@angular/core';
import {PlayerService} from "./player.service";
import {Observable} from "rxjs/Observable";
import {Player} from "../model/player.model";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players: Player[];

  constructor(private service: PlayerService) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      (players: Player[]) => {
        console.log(players);
        this.players = players;
      }
    );
  }

}
