import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  addPlayers = false;

  constructor() {
  }

  ngOnInit() {
  }

  onAddPlayer() {
    this.addPlayers = !this.addPlayers;
  }
}
