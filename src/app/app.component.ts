import {Component} from '@angular/core';
import {CoachService} from './coach/coach.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private serviceCoach: CoachService) {
  }
}
