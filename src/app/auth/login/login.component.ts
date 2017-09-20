import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

import {AuthService} from '../auth.service';
import {LOADER} from 'app/shared/loading.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  errorLogin = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.onLogout();
  }

  onSubmit() {
    // console.log('Login');
    LOADER.display(true);
    const email = this.form.value.email;
    const password = this.form.value.password;
    const e = Md5.hashStr(password + email);
    // console.log(e);
    this.auth.tryLogIn(email, e.toString()).subscribe(
      (data) => {
       this.auth.onLoginCoach(data, () => this.router.navigate(['']));
        LOADER.display(false);
      },
      (error) => {
        this.errorLogin = true;
        LOADER.display(false);
      }
    );
    // this.auth.onLoginCoach(email);
  }

}
