///<reference path="../../../model/player.model.ts"/>
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayerService} from '../../player.service';
import {Player} from '../../../model/player.model';
import {Subscription} from 'rxjs/Subscription';
import {DatePipe} from '@angular/common';
import {DateHelper} from '../../../shared/date-helper';
import {isNullOrUndefined} from 'util';
import {GroupService} from '../../../group-list/group.service';
import {AppValidators} from '../../../shared/app-validators';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class PlayerEditComponent implements OnInit, OnDestroy {
  months = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];

  id: number;
  subPlayers: Subscription;
  subGroups: Subscription;
  editForm: FormGroup;
  editMode = false;
  allGroups: any[] = [];

  pic = '../../../assets/img/user.svg';
  @ViewChild('fileInput') fileInput: ElementRef;

  // imgUrl = Values.userImage;
  // @ViewChild('imgCanvas') canvasRef: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PlayerService,
              private datepipe: DatePipe,
              private serviceGroup: GroupService) {
  }

  private initForm() {
    // console.log('initForm:');
    this.editForm = new FormGroup({
      'Name': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'MiddleName': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'Surname': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'Description': new FormControl('', Validators.maxLength(500)),
      'Birthday': new FormControl(null, AppValidators.dateValidator),
      'Medical': new FormControl(null, AppValidators.dateValidator),
      'Since': new FormControl(this.datepipe.transform(new Date(), 'dd/MM/yyyy'),
        [Validators.required, AppValidators.dateValidator]),
      'SportsmanId': new FormControl(''),
      'PhoneNumber1': new FormControl(''),
      'PhoneNumber2': new FormControl(''),
      'Weight': new FormControl(0),
      'Height': new FormControl(0),
      'Fees': new FormArray([]),
      'Groups': new FormArray([]),
      'Picture': new FormControl('')
      // ,
      // 'Activities': new FormArray([])
    });

    this.subGroups = this.serviceGroup.fetchAllGroups().subscribe(
      (groups: any[]) => {
        // console.log(groups);
        this.allGroups = groups;
      }
    );
  }

  onSubmit() {
    // console.log(this.editForm);
    const data = this.editForm.value;
    if (!isNullOrUndefined(data.Birthday) && data.Birthday !== '') {
      data.Birthday = new Date(DateHelper.parseStringToDate(data.Birthday));
    }
    if (!isNullOrUndefined(data.Medical) && data.Medical !== '') {
      data.Medical = new Date(DateHelper.parseStringToDate(data.Medical));
    }
    if (!isNullOrUndefined(data.Since) && data.Since !== '') {
      data.Since = new Date(DateHelper.parseStringToDate(data.Since));
    }
    for (const fee of data.Fees) {
      fee.Date = new Date(DateHelper.parseStringToDate(fee.Date));
      fee.Date.setHours(10);
    }
    // console.log(data);
    if (this.editMode) {
      data.Id = this.id;
      this.service.updatePlayer(data).subscribe(res => {
          this.onCancel();
        },
        error => console.log(error));
    } else {
      this.service.createPlayer(data).subscribe(res => {
          this.onCancel();
        },
        error => console.log(error));
    }
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onRefresh() {
    this.subPlayers = this.service.fetchPlayer(this.id).subscribe(
      (player: Player) => {
        // console.log('onRefresh:');
        this.editForm.reset();
        const copy = Object.assign({}, player);
        const data: any = copy;
        // console.log(data);
        const id = data.Id;
        delete data.Id;
        delete data.Thumbnail;
        if (!isNullOrUndefined(data.Picture)) {
          this.pic = data.Picture;
        }
        // data.Birthday = this.datepipe.transform(data.Birthday, 'dd/MM/yyyy');
        // data.Medical = this.datepipe.transform(data.Medical, 'dd/MM/yyyy');
        // data.Since = this.datepipe.transform(data.Since, 'dd/MM/yyyy');
        if (!isNullOrUndefined(data.Birthday) && data.Birthday !== '') {
          data.Birthday = this.datepipe.transform(data.Birthday, 'dd/MM/yyyy');
        }
        if (!isNullOrUndefined(data.Medical) && data.Medical !== '') {
          data.Medical = this.datepipe.transform(data.Medical, 'dd/MM/yyyy');
        }
        if (!isNullOrUndefined(data.Since) && data.Since !== '') {
          data.Since = this.datepipe.transform(data.Since, 'dd/MM/yyyy');
        }
        if (data['Groups']) {
          (<FormArray>this.editForm.get('Groups')).reset();
          for (const group of data.Groups) {
            (<FormArray>this.editForm.get('Groups')).push(
              new FormGroup({
                'Name': new FormControl(group.Name),
                'Location': new FormControl(group.Location),
                'Id': new FormControl(group.Id, Validators.required),
                'Coaching': new FormArray([]),
                'GroupPlayers': new FormArray([]),
                'Activities': new FormArray([])
              })
            );
          }
        }
        if (data['Fees']) {
          for (const fee of data.Fees) {
            (<FormArray>this.editForm.get('Fees')).reset();
            fee.Date = this.datepipe.transform(new Date(fee.Date), 'dd/MM/yyyy');
            (<FormArray>this.editForm.get('Fees')).push(
              new FormGroup({
                'Id': new FormControl(fee.Id, Validators.required),
                'Date': new FormControl(fee.Date,
                  [Validators.required, AppValidators.dateValidator]),
                'PlayerId': new FormControl(fee.PlayerId, Validators.required),
                'Fee': new FormControl(fee.Fee, Validators.required),
                'Month': new FormControl(fee.Month, Validators.required)
              })
            );
          }
        }
        // console.warn(data);

        delete data.Activities;
        this.editForm.setValue(data);
        data.Id = id;
      }
    );
  }

  ngOnInit() {
    // console.log('ngOnInit:');
    this.initForm();
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

  ngOnDestroy(): void {
    if (this.subPlayers != null) {
      this.subPlayers.unsubscribe();
    }
  }

  onAddGroup() {
    const control = new FormGroup({
      'Name': new FormControl(''),
      'Location': new FormControl(''),
      'Id': new FormControl('1', Validators.required),
      'Coaching': new FormArray([]),
      'GroupPlayers': new FormArray([]),
      'Activities': new FormArray([])
    });
    (<FormArray>this.editForm.get('Groups')).push(control);
  }

  changeImage(e) {
    const reader = e.target;
    this.pic = reader.result.toString();
    this.editForm.controls['Picture'].setValue(this.pic);
  }

  encodeImageFileAsURL(e) {

    // console.warn('encodeImageFileAsURL:');
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = this.changeImage.bind(this);
    reader.readAsDataURL(file);
  }

  triggerFile() {
    this.fileInput.nativeElement.click();
  }

  getControls(name: string) {
    // const values = this.editForm.get(name).value;
    const form = this.editForm.get(name) as FormArray;
    return form.controls;
  }

  isGroupSelected(id: number) {
    const groups = this.getControls('Groups');
    return groups.findIndex(z => z.value.Id === id) !== -1;
  }

  onDeleteItem(name: string, index: number) {
    (<FormArray>this.editForm.get(name)).removeAt(index);
  }

  getFeeMonth(fee: FormGroup) {
    const ret = this.months[(fee.value.Month % 100) - 1];
    return ret;
  }

  getFeeYear(fee: FormGroup) {
    const ret = fee.value.Month.toString().substr(0, 4);
    return ret;
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.service.deletePlayer(this.id).subscribe( (data) => this.router.navigate(['/', 'players']));
    }
  }
}
