import {Activity} from './activity.model';
import {Player} from './player.model';
import {Coach} from './coach.model';

export class Group {
  constructor(public Activities: Activity[],
              public Coaching: Coach[],
              public GroupPlayers: Player[],
              public Id: number,
              public Name: string,
              public Location: string) {
  }
}
