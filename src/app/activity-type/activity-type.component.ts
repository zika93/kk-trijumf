import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl, Validator} from '@angular/forms';
import {CoachService} from '../coach/coach.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-activity-type',
  templateUrl: './activity-type.component.html',
  styleUrls: ['./activity-type.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ActivityTypeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ActivityTypeComponent),
      multi: true,
    }]
})
export class ActivityTypeComponent implements OnInit, OnDestroy/*, ControlValueAccessor, Validator */{


  activityTypes: any[] = [];
  private data: any;
  public jsonString: string;
  private parseError: boolean;
  private sub: Subscription;

  private propagateChange = (_: any) => {
  }

  constructor(private service: CoachService) {
  }

  ngOnInit() {
    this.sub = this.service.getActivityTypes().subscribe((data: any[]) => {
      this.activityTypes = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // writeValue(obj: any): void {
  //   if (obj) {
  //     this.data = obj;
  //     this.jsonString = JSON.stringify(this.data);
  //   }
  // }
  //
  // registerOnChange(fn: any): void {
  //   this.propagateChange = fn;
  // }
  //
  // registerOnTouched(fn: any): void {
  // }
  //
  // public validate(c: FormControl) {
  //   return (!this.parseError) ? null : {
  //     jsonParseError: {
  //       valid: false,
  //     },
  //   };
  // }
  //
  // private onChange(event) {
  //
  //   // get value from text area
  //   const newValue = event.target.value;
  //
  //   try {
  //     // parse it to json
  //     this.data = JSON.parse(newValue);
  //     this.parseError = false;
  //   } catch (ex) {
  //     // set parse error if it fails
  //     this.parseError = true;
  //   }
  //
  //   // update the form
  //   this.propagateChange(this.data);
  // }
  //
  // toShow(id: number) {
  //   if (this.activityTypes.length >= id) {
  //     return this.activityTypes[id - 1].Value;
  //   } else {
  //     return '';
  //   }
  // }
}
