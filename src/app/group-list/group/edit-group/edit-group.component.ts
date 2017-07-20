import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {GroupService} from '../../group.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Group} from 'app/model/group.model';
import {Activity} from '../../../model/activity.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit, OnDestroy {
  id: number;
  addPlayers = false;

  sub: Subscription;
  editForm: FormGroup;
  editMode = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: GroupService) {
  }

  private initForm() {
    console.log('initForm:');
    this.editForm = new FormGroup({
      'Activities': new FormArray([], Validators.required),
      // 'Coaching': new FormArray([], Validators.required),
      // 'GroupPlayers': new FormArray([], Validators.required),
      'Name': new FormControl(''),
      'Location': new FormControl(''),
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
    this.sub = this.service.getGroup(this.id).subscribe(
      (group: Group) => {
        console.log('onRefresh:');
        console.log(group);
        const copy = Object.assign({}, group);
        const data: any = copy;
        const id = data.Id;
        delete data.Id;
        this.editForm.patchValue(data);
        data.Id = id;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  onAddPlayer() {
    this.addPlayers = !this.addPlayers;
  }

  onAddActivity() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.editForm.get('Activities')).push(control);
  }
}
