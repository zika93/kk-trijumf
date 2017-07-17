import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Group} from '../../model/group.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  sub: Subscription;

  group: Group = new Group([], [], [], null, '', '');
  id: number;


  constructor(private service: GroupService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.sub = this.service.getGroup(this.id).subscribe(
          (group: Group) => {
            console.log(group);
            this.group = group;
          }
        );
      }
    );
  }


  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
