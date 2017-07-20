import {Activity} from './activity.model';

export class Group {
  constructor(public Activities: Activity[],
              /*public Coaching: any[],
              public GroupPlayers: any[],*/
              public Id: number,
              public Name: string,
              public Location: string) {
  }
}
