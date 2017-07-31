import {isNullOrUndefined} from 'util';
import {Values} from '../shared/static/values';
import {Fee} from './fee.model';
import {Group} from './group.model';
import {Activity} from './activity.model';
export class Player {

  constructor(public Fees: Fee[],
              public Groups: Group[],
              public Activities: any[],
              public Id: number,
              public Name: string,
              public MiddleName: string,
              public Surname: string,
              public Description: string,
              public Since: Date,
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

//   public getThumbnail(): string {
//   return !isNullOrUndefined(this.Thumbnail) ? this.Thumbnail : Values.userImage;
// }


}
