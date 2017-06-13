import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading-nav',
  templateUrl: './heading-nav.component.html',
  styleUrls: ['./heading-nav.component.css']
})
export class HeadingNavComponent implements OnInit {

  isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
