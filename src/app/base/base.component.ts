import {Component, OnInit} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {LoadingService} from '../shared/loading.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  // Sets initial value to true to show loading spinner on first load
  loading = true;

  constructor(private router: Router, private loader: LoadingService) {


    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    this.loader.loading.subscribe((load: boolean) => setTimeout( this.changeLoadingStatus(load), 5));
    // (
    //   (load: boolean) => {
    //     console.log(load);
    //     this.loading = load;
    //   }
    // );
  }

  changeLoadingStatus(toShow: boolean) {
    if(this.loading !== toShow)
      this.loading = toShow;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnInit() {
  }

}
