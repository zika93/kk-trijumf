import {Component, OnInit} from '@angular/core';

import {Player} from '../../model/player.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = new Player([], [], [], [], null, '', '', '', null, null, null, null);
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


  constructor(private route: ActivatedRoute, private service: PlayerService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.service.getPlayer(this.id).subscribe(
          (player: Player) => {
            console.log(player);
            player.Birthday = new Date(player.Birthday);
            this.player = player;
          }
        );
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route});
  }

  addFee() {
    console.log('add feeee');
  }

  refreshFee() {
    console.log('refresh feeee');
    this.service.fetchPlayerFees(this.id).subscribe(
      (param: Params) => {
        this.player.Fee = param;
      }
    );
  }

}
