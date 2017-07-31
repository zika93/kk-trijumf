import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from '../activity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppValidators} from '../../shared/app-validators';
import {DateHelper} from '../../shared/date-helper';
import {HttpHelper} from '../../shared/http-helper';
import {Subscription} from 'rxjs/Subscription';
import {CoachService} from '../../coach/coach.service';
import {isNullOrUndefined} from 'util';
import {Activity} from '../../model/activity.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit, OnDestroy {


  public activityForm: FormGroup;
  activityTypes: any[] = [];

  sub: Subscription;
  subCoach: Subscription;
  @Input() groupId: number = null;
  @Input() cancelClick: Function;
  @Input() submitClick: Function;
  @Input() activity: Activity;
  @Input() cancelButton = 'Cancel';
  @Input() submitButton = 'Submit';

  constructor(private service: ActivityService,
              private coachService: CoachService,
              private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.activityForm = new FormGroup({
      'Name': new FormControl('', Validators.required),
      'Date': new FormControl(null, [Validators.required, AppValidators.dateTimeValidator]),
      'GroupId': new FormControl(this.groupId),
      'Id': new FormControl(0),
      'Type': new FormControl('1', Validators.required)
    });

    this.subCoach = this.coachService.getActivityTypes().subscribe((data: any[]) => {
      this.activityTypes = data;
    });
    if (!isNullOrUndefined(this.activity)) {
      this.onRefresh();
    }
  }

  onRefresh(activity?: Activity) {
    if (!isNullOrUndefined(activity)) {
      this.activity = activity;
    }
    const copy = Object.assign({}, this.activity);
    const data: any = copy;
    // data.Date = new Date(data.Date);
    data.Date = this.datepipe.transform(new Date(data.Date), 'dd/MM/yyyy HH:mm');
    this.activityForm.patchValue(data);
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.sub)) {
      this.sub.unsubscribe();
    }
    if (!isNullOrUndefined(this.subCoach)) {
      this.subCoach.unsubscribe();
    }
  }

  onSubmit() {
    const activity = this.activityForm.value;
    activity.Date = new Date(DateHelper.parseStringToDateTime(activity.Date));
    // console.log(activity);
    this.sub = this.service.createActivity(activity).subscribe(res =>
        this.submitClick()
      ,
      HttpHelper.handleErrorObservable);
  }

  onCancel() {
    this.cancelClick();
  }

  setCurrentDate() {
    this.activityForm.patchValue({'Date': this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm')});
  }

}
