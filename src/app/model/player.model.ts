import {isNullOrUndefined} from 'util';
import {Values} from '../shared/static/values';
export class Player {

  constructor(public Fees: any,
              public GroupPlayers: any,
              public PlayerActivities: any,
              public Id: number,
              public Name: string,
              public MiddleName: string,
              public Surname: string,
              public Birthday: Date,
              public Medical: Date,
              public Height: number,
              public Weight: number,
              public SportsmanId: number,
              public PhoneNumber1: string,
              public PhoneNumber2: string,
              public Picture: string,
              public Thumbnail: string) {
  }

  public getThumbnail(): string {
  return isNullOrUndefined(this.Thumbnail) ? this.Thumbnail : Values.userImage;
}

}
