import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {GroupService} from './group.service';
import {isNullOrUndefined} from 'util';
import {Group} from '../model/group.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: Group[];

  subGroups: Subscription;


  constructor(private service: GroupService) {
  }

  onRefresh() {
    this.ngOnDestroy();
    this.subGroups = this.service.fetchAllGroups().subscribe(
      (groups: Group[]) => {
        console.log(groups);
        this.groups = groups;
      }
    );
  }

  ngOnInit() {
    this.subGroups = this.service.fetchAllGroups().subscribe(
      (groups: Group[]) => {
        console.log(groups);
        this.groups = groups;
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subGroups)) {
      this.subGroups.unsubscribe();
    }
  }

}
