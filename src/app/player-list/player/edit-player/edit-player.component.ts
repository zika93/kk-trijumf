///<reference path="../../../model/player.model.ts"/>
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayerService} from '../../player.service';
import {Player} from '../../../model/player.model';
import {Subscription} from 'rxjs/Subscription';
import {DatePipe} from '@angular/common';
import {DateHelper} from '../../../shared/date-helper';
import {Values} from '../../../shared/static/values';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class PlayerEditComponent implements OnInit, OnDestroy {
  id: number;
  sub: Subscription;
  editForm: FormGroup;
  editMode = false;
  pic = '../../../assets/img/user.svg';
  @ViewChild('fileInput') fileInput: ElementRef;

  // imgUrl = Values.userImage;
  // @ViewChild('imgCanvas') canvasRef: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PlayerService,
              private datepipe: DatePipe) {
  }

  private initForm() {
    console.log('initForm:');
    this.editForm = new FormGroup({
      'Name': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'MiddleName': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'Surname': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'Birthday': new FormControl(null),
      'Medical': new FormControl(null),
      'SportsmanId': new FormControl(''),
      'PhoneNumber1': new FormControl(''),
      'PhoneNumber2': new FormControl(''),
      'Weight': new FormControl(0),
      'Height': new FormControl(0),
      'Fees': new FormArray([]),
      'Groups': new FormArray([]),
      'Picture': new FormControl(''),
      'Activities': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.editForm);
    const data = this.editForm.value;
    data.Birthday = new Date(DateHelper.parseStringToDate(data.Birthday));
    data.Medical = new Date(DateHelper.parseStringToDate(data.Medical));
    console.log(data);
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
    this.sub = this.service.getPlayer(this.id).subscribe(
      (player: Player) => {
        console.log('onRefresh:');
        console.log(player);
        const copy = Object.assign({}, player);
        const data: any = copy;
        const id = data.Id;
        delete data.Id;
        delete data.Thumbnail;
        if (!isNullOrUndefined(data.Picture)) {
          this.pic = data.Picture;
        }
        data.Birthday = this.datepipe.transform(data.Birthday, 'dd/MM/yyyy');
        data.Medical = this.datepipe.transform(data.Medical, 'dd/MM/yyyy');
        console.warn(data);
        this.editForm.patchValue(data);
        data.Id = id;
      }
    );
  }

  ngOnInit() {
    console.log('ngOnInit:');
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
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  changeImage(e) {
    const reader = e.target;
    this.pic = reader.result.toString();
    this.editForm.controls['Picture'].setValue(this.pic);
  }

  encodeImageFileAsURL(e) {

    console.warn('encodeImageFileAsURL:');
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = this.changeImage.bind(this);
    reader.readAsDataURL(file);
  }

  triggerFile() {
    this.fileInput.nativeElement.click();
  }
}
