import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayerService} from '../../player.service';
import {Player} from '../../../model/player.model';
import {Subscription} from 'rxjs/Subscription';
import {DatePipe} from '@angular/common';
import {DateHelper} from '../../../shared/date-helper';

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

  constructor(private router: Router, private route: ActivatedRoute, private service: PlayerService, private datepipe: DatePipe) {
  }

  private initForm() {
    let name = '';
    let lastname = '';
    let middlename = '';
    let birthday: Date;
    let height = 0;
    let weight = 0;
    let sid = '';
    let fee = [];
    let gp = [];
    let pic = [];
    let pa = [];

    this.editForm = new FormGroup({
      'Name': new FormControl(name),
      'MiddleName': new FormControl(middlename),
      'Surname': new FormControl(lastname),
      'Birthday': new FormControl(birthday),
      'SportsmanId': new FormControl(sid),
      'Weight': new FormControl(weight),
      'Height': new FormControl(height),
      'Fee': new FormArray(fee),
      'GroupPlayers': new FormArray(gp),
      'Picture': new FormArray(pic),
      'PlayerActivity': new FormArray(pa)
    });

    if (this.editMode) {
      this.sub = this.service.getPlayer(this.id).subscribe(
        (player: Player) => {
          const data: any = player;
          delete data.Id;
          // const dat =  new Date(data.Birthday.valueOf())
          // dat.setDate(dat.getDate() + 1);
          // data.Birthday = dat;
          data.Birthday = this.datepipe.transform(data.Birthday, 'dd/MM/yyyy');
          // name = player.Name;
          // lastname = player.Surname;
          // middlename = player.MiddleName;
          // console.log(player.Birthday);
          // birthday = new Date(player.Birthday);
          // console.log(birthday);
          // height = player.Height;
          // weight = player.Weight;
          // sid = player.SportsmanId.toString();
          // fee = player.Fee;
          // pic = player.Picture;
          // gp = player.GroupPlayers;
          // pa = player.PlayerActivity;

          this.editForm.setValue(data);
          // this.editForm = new FormGroup({
          //   'Name': new FormControl(name),
          //   'Middlename': new FormControl(middlename),
          //   'Surname': new FormControl(lastname),
          //   'Birthday': new FormControl(birthday),
          //   'SportsmanId': new FormControl(sid),
          //   'Weight': new FormControl(weight),
          //   'Height': new FormControl(height),
          //   'Fee': new FormArray(fee),
          //   'GroupPlayers': new FormArray(gp),
          //   'Picture': new FormArray(pic),
          //   'PlayerActivity': new FormArray(pa)
          // });

        }
      );
    }
  }

  onSubmit() {
    console.log(this.editForm);
    const data = this.editForm.value;
    data.Birthday = new Date(DateHelper.parseStringToDate(data.Birthday));
    console.log(data);
    if (this.editMode) {
      data.Id = this.id;
      this.service.updatePlayer(data).subscribe(res => {
          console.log('wohooo');
          this.id = -1;
        },
        error => console.log(error));
    } else {
      this.service.createPlayer(data).subscribe(res => {
          console.log('wohooo');
          this.id = -1;
        },
        error => console.log(error));
    }
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
      }
    );

  }

  ngOnDestroy(): void {
    if (this.sub != null)
      this.sub.unsubscribe();
  }
}
