import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Group} from '../../model/group.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {LOADER} from '../../shared/loading.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  sub: Subscription;

  group: Group = new Group([], [], [], null, '', '');
  id: number;

  isCollapsedActivities = false;
  isCollapsedPlayers = false;
  isCollapsedCoaches = false;

  addActivity = false;

  constructor(private service: GroupService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    LOADER.show();
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.onRefresh();
      }
    );
  }

  onRefresh() {
    this.ngOnDestroy();
    this.sub = this.service.fetchGroup(this.id).subscribe(
      (group: Group) => {
        this.group = group;
        LOADER.hide();
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.sub)) {
      this.sub.unsubscribe();
    }
  }


  toggleCollapseActivities() {
    this.isCollapsedActivities = !this.isCollapsedActivities;
  }

  toggleCollapsePlayers() {
    this.isCollapsedPlayers = !this.isCollapsedPlayers;
  }

  toggleCollapseCoaches() {
    this.isCollapsedCoaches = !this.isCollapsedCoaches;
  }

  addActivities() {
    this.addActivity = !this.addActivity;
  }

  onAddedActivity() {
    this.addActivity = !this.addActivity;
    this.onRefresh();
  }

}
