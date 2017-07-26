import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

import {AuthService} from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Login');
    const email = this.form.value.email;
    const password = this.form.value.password;
    const e = Md5.hashStr(password);
    console.log(e);
    this.auth.onLogin(email);
    this.router.navigate(['']);
  }

}
