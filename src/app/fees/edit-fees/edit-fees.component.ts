import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppValidators} from '../../shared/app-validators';
import {FeesService} from '../fees-service.service';
import {DatePipe} from '@angular/common';
import {Fee} from 'app/model/fee.model';
import {isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs/Subscription';
import {DateHelper} from 'app/shared/date-helper';
import {HttpHelper} from '../../shared/http-helper';
import {Values} from '../../shared/static/values';

@Component({
  selector: 'app-edit-fees',
  templateUrl: './edit-fees.component.html',
  styleUrls: ['./edit-fees.component.css']
})
export class EditFeesComponent implements OnInit, OnDestroy {

  public feeForm: FormGroup;
  @Input() fee: Fee;
  @Input() lastFee: number;

  monthSelector: number[] = [];
  monthList = Values.months;

  private id: number;
  private editMode = false;
  @Input() playerId: number = null;
  @Input() cancelClick: Function;
  @Input() submitClick: Function;
  @Input() cancelButton = 'Cancel';
  @Input() submitButton = 'Submit';
  @Input() hideButtons = false;

  private sub: Subscription;

  constructor(private serviceFees: FeesService,
              private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.fillMonthSelector();
    this.initForm();
    if (!isNullOrUndefined(this.fee)) {
      this.onRefresh();
    }
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.sub)) {
      this.sub.unsubscribe();
    }
  }

  initForm() {
    const dateNow = Date.now();
    this.feeForm = new FormGroup({
      'Id': new FormControl(0, Validators.required),
      'Date': new FormControl(this.datepipe.transform(dateNow, 'dd/MM/yyyy'),
        [Validators.required, AppValidators.dateValidator]),
      'PlayerId': new FormControl(this.playerId, Validators.required),
      'Fee': new FormControl('', Validators.required),
      'Month': new FormControl('', Validators.required)
    });
  }

  onRefresh(fee?: Fee) {
    if (!isNullOrUndefined(fee)) {
      this.fee = fee;
      this.editMode = true;
    }
    const copy = Object.assign({}, this.fee);
    const data: any = copy;
    data.Date = this.datepipe.transform(new Date(data.Date), 'dd/MM/yyyy');
    this.feeForm.patchValue(data);
  }

  onSubmit() {
    this.ngOnDestroy();
    const fee = this.feeForm.value;
    fee.Date = new Date(DateHelper.parseStringToDate(fee.Date));
    // console.log(fee);
    if (!this.editMode) {
      this.sub = this.serviceFees.createFee(fee).subscribe(res =>
          this.submitClick(),
        HttpHelper.handleErrorObservable);
    } else {
      this.sub = this.serviceFees.updateFee(fee).subscribe(res =>
          this.submitClick(),
        HttpHelper.handleErrorObservable);
    }
  }

  onCancel() {
    this.cancelClick();
  }

  fillMonthSelector() {
    const date = new Date();
    const year = date.getFullYear();
    const nextYear = year + 1;
    for (let i = 1; i <= 12; i++) {
      if (i <= this.selectFee()) {
        this.monthSelector.push(+(nextYear.toString() + this.pad(i, 2)));
      } else {
        this.monthSelector.push(+(year.toString() + this.pad(i, 2)));
      }
    }
  }

  getYear(num: number) {
    return num.toString().substr(0, 4);
  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) {
     s = '0' + s;
    }
    return s;
  }

  selectFee() {
    return !isNullOrUndefined(this.lastFee) ? this.lastFee : 0;

    // const date: Date = new Date();
    // return !isNullOrUndefined(this.lastFee) ? this.lastFee : +(date.getFullYear().toString() + '01');
  }
}
