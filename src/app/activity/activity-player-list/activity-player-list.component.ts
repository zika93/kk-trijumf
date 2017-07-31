import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../model/player.model';

@Component({
  selector: 'app-activity-player-list',
  templateUrl: './activity-player-list.component.html',
  styleUrls: ['./activity-player-list.component.css']
})
export class ActivityPlayerListComponent implements OnInit {

  @Input() players: Player[];
  @Input() checked: boolean[];
  @Input() submit: Function;
  @Input() submitMessage: string;

  constructor() { }

  ngOnInit() {
  }

  changeStatus(index: number) {
    this.checked[index] = !this.checked[index];
  }
}
