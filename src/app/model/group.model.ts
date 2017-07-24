import {Activity} from './activity.model';
import {Player} from './player.model';

export class Group {
  constructor(public Activities: Activity[],
              /*public Coaching: any[],*/
              public GroupPlayers: Player[],
              public Id: number,
              public Name: string,
              public Location: string) {
  }
}
