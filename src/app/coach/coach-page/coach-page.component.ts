import {Component, OnInit} from '@angular/core';
import {CoachService} from '../coach.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Coach} from '../../model/coach.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LOADER} from '../../shared/loading.service';

@Component({
  selector: 'app-coach-page',
  templateUrl: './coach-page.component.html',
  styleUrls: ['./coach-page.component.css']
})
export class CoachPageComponent implements OnInit {
  public coach: Coach = new Coach(null, '', '', null, null, '');

  constructor(private service: CoachService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.service.getCoach(Cookie.get('id')).subscribe((data) => {
      this.coach = data;
      LOADER.hide();
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
