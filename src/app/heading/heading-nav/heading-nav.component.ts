import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-heading-nav',
  templateUrl: './heading-nav.component.html',
  styleUrls: ['./heading-nav.component.css']
})
export class HeadingNavComponent implements OnInit {

  isCollapsed = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.auth.onLogout();
  }

}
