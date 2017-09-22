import {Component, OnDestroy, OnInit} from '@angular/core';
import {LOADER} from './shared/loading.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showLoader: boolean;

  private sub: Subscription;

  constructor() {
  }

  ngOnInit() {

    this.sub = LOADER.loading.asObservable().debounceTime(100).subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

