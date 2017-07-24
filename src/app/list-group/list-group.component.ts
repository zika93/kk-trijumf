import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../model/group.model';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  @Input() groups: Group[];

  constructor() {
  }

  ngOnInit() {
  }

}
