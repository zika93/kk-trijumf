import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  title = 'Upcoming';

  upcomingArr: {name: string, group: number, date: Date}[] = [
    {name : '2002. Dusko', group : 1, date: new Date('2005/01/01')},
    {name : '2004. Dusko', group : 2, date: new Date('2005/01/01')},
    {name : '2006. Dusko', group : 3, date: new Date('2005/01/01')},
  ];

  constructor() { }

  ngOnInit() {
  }

  private openGroup(id) {
    console.log(id);
  }

}
