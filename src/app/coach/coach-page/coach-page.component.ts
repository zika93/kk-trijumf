import { Component, OnInit } from '@angular/core';
import {CoachService} from '../coach.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Coach} from '../../model/coach.model';

@Component({
  selector: 'app-coach-page',
  templateUrl: './coach-page.component.html',
  styleUrls: ['./coach-page.component.css']
})
export class CoachPageComponent implements OnInit {
  private coach: Coach;

  constructor(private service: CoachService) { }

  ngOnInit() {
    this.service.getCoach(Cookie.get('id')).subscribe((data) => this.coach = data);
  }

}
