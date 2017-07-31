import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CoachService} from '../coach.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {AppValidators} from '../../shared/app-validators';
import {isNullOrUndefined} from 'util';
import {DatePipe} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {DateHelper} from '../../shared/date-helper';

@Component({
  selector: 'app-coach-edit',
  templateUrl: './coach-edit.component.html',
  styleUrls: ['./coach-edit.component.css']
})
export class CoachEditComponent implements OnInit {
  editForm: FormGroup;
  passwordForm: FormGroup;
  constructor(private service: CoachService,
              private datepipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'Name': new FormControl('', Validators.required),
      'Surname': new FormControl('', Validators.required),
      'Birthday': new FormControl(null, [Validators.required, AppValidators.dateValidator]),
      'CoachId': new FormControl(null),
      'Id': new FormControl(0),
      'Username': new FormControl('', Validators.required)
    });
    this.passwordForm = new FormGroup({
      'Old': new FormControl('', Validators.required),
      'New': new FormControl('', Validators.required),
      'Repeat': new FormControl('', Validators.required)
    })
    this.service.getCoach(Cookie.get('id')).subscribe((data: any) => {
        if (!isNullOrUndefined(data.Birthday) && data.Birthday !== '') {
          data.Birthday = this.datepipe.transform(data.Birthday, 'dd/MM/yyyy');
        }
        this.editForm.patchValue(data);
      }
    );
  }

  onSubmit() {
    const data = this.editForm.value;
    if (!isNullOrUndefined(data.Birthday) && data.Birthday !== '') {
      data.Birthday = new Date(DateHelper.parseStringToDate(data.Birthday));
    }
    this.service.updateCoach(data).subscribe(res => {
        this.onCancel();
      },
      error => console.log(error));
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  changePassword() {
    const data = this.editForm.value;
    data['Password'] = this.passwordForm.value.Old;
    this.service.updatePasswordCoach(data, this.passwordForm.value.New).subscribe(res => {
        this.onCancel();
      },
      error => console.log(error));
  }

  matchPassword() {
    return this.passwordForm.value.New === this.passwordForm.value.Repeat;
  }

}
