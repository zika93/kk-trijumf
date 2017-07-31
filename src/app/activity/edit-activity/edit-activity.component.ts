import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivityService} from '../activity.service';
import {DateHelper} from '../../shared/date-helper';
import {HttpHelper} from '../../shared/http-helper';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Activity} from '../../model/activity.model';
import {AddActivityComponent} from 'app/activity/add-activity/add-activity.component';
import {CanComponentDeactivate} from 'app/shared/can-component-deactivate';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public activity: Activity = new Activity(0, 1, '', null, null);
  subRefresh: Subscription;
  editMode = false;
  id: number;
  @ViewChild('child') child: AddActivityComponent;

  constructor(private service: ActivityService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        if (this.editMode) {
          this.onRefresh();
        }
      }
    );
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.subRefresh)) {
      this.subRefresh.unsubscribe();
    }
  }

  onRefresh() {
    this.subRefresh = this.service.fetchActivity(this.id).subscribe(
      (activity: any) => {
        // console.warn(activity);
        this.activity = activity;
        this.child.onRefresh(this.activity);
      });
  }

  onSubmit() {
    this.activity.Date = new Date(DateHelper.parseStringToDateTime( this.activity.Date));
    this.activity.GroupId = this.id;
    // console.log( this.activity);
    if (this.editMode) {
      this.activity.Id = this.id;
      this.service.updateActivity(this.activity).subscribe(res => {
          this.onCancel();
        },
        HttpHelper.handleErrorObservable);
    } else {
      this.service.createActivity(this.activity).subscribe(res => {
          this.onCancel();
        },
        HttpHelper.handleErrorObservable);
    }
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  saveButton() {
    return this.editMode ? 'Update activity' : 'Add activity';
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
      return true;
  }
}
