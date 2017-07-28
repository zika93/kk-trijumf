import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

import {AuthService} from '../auth.service';
import {CoachService} from '../../coach/coach.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  errorLogin = false;
  constructor(private auth: AuthService, private router: Router, private coachService: CoachService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Login');
    const email = this.form.value.email;
    const password = this.form.value.password;
    const e = Md5.hashStr(password + email);
    console.log(e);
    this.auth.tryLogIn(email, e.toString()).subscribe(
      (data) => {
       this.auth.onLoginCoach(data, () => this.router.navigate(['']));
      },
      (error) => {
        this.errorLogin = true;
      }
    );
    // this.auth.onLoginCoach(email);
  }

}
