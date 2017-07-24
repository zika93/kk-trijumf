import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {GroupService} from '../../group.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Group} from 'app/model/group.model';
import {Activity} from '../../../model/activity.model';
import {DateHelper} from '../../../shared/date-helper';
import {DatePipe} from '@angular/common';
import {CoachService} from '../../../coach/coach.service';
import {HttpHelper} from '../../../shared/http-helper';
import {PlayerService} from '../../../player-list/player.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit, OnDestroy {
  id: number;
  addPlayers = false;
  activityTypes: any[] = [];
  players: any[] = [];
  sub: Subscription;
  subCoach: Subscription;
  subPlayers: Subscription;
  editForm: FormGroup;
  editMode = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: GroupService,
              private datepipe: DatePipe,
              private serviceC: CoachService,
              private servicePlayers: PlayerService) {
  }

  private initForm() {
    console.log('initForm:');
    const actArray: any[] = [];
    this.editForm = new FormGroup({
      'Activities': new FormArray(actArray),
      // 'Coaching': new FormArray([], Validators.required),
      'GroupPlayers': new FormArray([]),
      'Name': new FormControl('', Validators.required),
      'Location': new FormControl('', Validators.required),
    });

    this.subCoach = this.serviceC.getActivityTypes().subscribe((data: any[]) => {
      this.activityTypes = data;
    });
    this.subPlayers = this.servicePlayers.getAll().subscribe((data: any[]) => {
      this.players = data;
    });
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


  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onRefresh() {
    this.sub = this.service.fetchGroup(this.id).subscribe(
      (group: Group) => {
        console.log('onRefresh:');
        console.log(group);
        const copy = Object.assign({}, group);
        const data: any = copy;
        const id = data.Id;
        delete data.Id;
        this.editForm.patchValue(data);
        if (data['Activities']) {
          for (const activity of data.Activities) {
            activity.Date = this.datepipe.transform(new Date(activity.Date), 'dd/MM/yyyy HH:mm'); ;
            (<FormArray>this.editForm.get('Activities')).push(
              new FormGroup({
                'Name': new FormControl(activity.Name, Validators.required),
                'Date': new FormControl(activity.Date, Validators.required),
                'GroupId': new FormControl(activity.GroupId),
                'Id': new FormControl(activity.Id),
                'Type': new FormControl(activity.Type, Validators.required)
              })
            );
          }
        }
        if (data['GroupPlayers']) {
          for (const player of data.GroupPlayers) {
            (<FormArray>this.editForm.get('GroupPlayers')).push(
              new FormGroup({
                'Name': new FormControl(player.Name),
                'MiddleName': new FormControl(player.MiddleName),
                'Surname': new FormControl(player.Surname),
                'Id': new FormControl(player.Id, Validators.required)
              })
            );
          }
        }
        data.Id = id;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
    if (this.subCoach != null) {
      this.subCoach.unsubscribe();
    }
    if (this.subPlayers != null) {
      this.subPlayers.unsubscribe();
    }
  }

  onAddPlayer() {
    const control = new FormGroup({
      'Name': new FormControl(''),
      'MiddleName': new FormControl(''),
      'Surname': new FormControl(''),
      'Id': new FormControl('1', Validators.required)
    });
    (<FormArray>this.editForm.get('GroupPlayers')).push(control);
  }

  onAddActivity() {
    const control = new FormGroup({
      'Name': new FormControl(null, Validators.required),
      'Date': new FormControl(null, Validators.required),
      'GroupId': new FormControl(this.id),
      'Id': new FormControl(null),
      'Type': new FormControl('1', Validators.required)
    });
    (<FormArray>this.editForm.get('Activities')).push(control);
  }

  onSubmit() {
    console.log(this.editForm);
    const data = this.editForm.value;
    for (const activity of data.Activities){
      activity.Date = new Date(DateHelper.parseStringToDateTime(activity.Date));
      activity.GroupId = this.id;
    }
    console.log(data);
    if (this.editMode) {
      data.Id = this.id;
      this.service.updateGroup(data).subscribe(res => {
          this.onCancel();
        },
        HttpHelper.handleErrorObservable);
    } else {
      this.service.createGroup(data).subscribe(res => {
          this.onCancel();
        },
        HttpHelper.handleErrorObservable);
    }
  }

  getControls(name: string) {
    // const values = this.editForm.get(name).value;
    const form = this.editForm.get(name) as FormArray;;
    return form.controls;
  }


  onDeleteItem(name: string, index: number) {
    (<FormArray>this.editForm.get(name)).removeAt(index);
  }
}
