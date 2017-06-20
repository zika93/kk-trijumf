import {Component, OnInit} from '@angular/core';

import {Player} from '../../model/player.model';
import {ActivatedRoute, Params} from '@angular/router';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = new Player([], [], [], [], 1, 'Filip', 'Zarko', 'Ristic', new Date(1993, 5, 11), 175, 80, 20);
  id: number;
  imgUrl = '../../../assets/img/user.svg';

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


  constructor(private route: ActivatedRoute, private service: PlayerService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.service.getPlayer(this.id).subscribe(
          (player: Player) => {
            console.log(player);
            this.player = player;
          }
        );
      }
    );
  }

}
