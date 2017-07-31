import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Player} from '../model/player.model';
import {Observer} from 'rxjs/Observer';
import {Values} from 'app/shared/static/values';
import {isNullOrUndefined} from 'util';
import {HttpHelper} from '../shared/http-helper';
import {HttpAuthClient} from '../auth/http-auth-client';

@Injectable()
export class PlayerService {

  // players: Player[];


  constructor(private http: HttpAuthClient) {
  }

  // http://localhost:51194
  // getAll() {
  //   if (this.players == null || this.players.length === 0) {
  //     console.log('returning fetched!');
  //     return this.fetchAllPlayers();
  //   } else {
  //     console.log('returning old!');
  //     return Observable.create((observer: Observer<Player[]>) => {
  //       observer.next(this.players);
  //     });
  //   }
  // }

  fetchAllPlayers() {
    // console.log('fetching!');
    return this.http.get(Values.url + '/player/getall').map(
      (response: Response) => {
        // console.log(response.json());
        // this.players = response.json();
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  // setPlayers(players: Player[]) {
  //   this.players = players;
  // }
  //
  // getPlayer(id: number) {
  //   if (isNullOrUndefined(this.players) || this.players.length === 0) {
  //     return this.fetchPlayer(id);
  //   }
  //   const pl = this.players.filter(x =>
  //     x.Id === id
  //   );
  //   if (pl != null && pl.length > 0) {
  //     return Observable.create((observer: Observer<Player>) => {
  //       observer.next(pl[0]);
  //     });
  //   } else {
  //     return this.fetchPlayer(id);
  //   }
  // }

  fetchPlayer(id: number) {
    return this.http.get(Values.url + '/player/get/' + id).map(
      (response: Response) => {
        const player: Player = response.json();
        // console.log(response.json());
        // console.log(player);
        // this.changePlayer(player);
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  fetchPlayerFees(id: number) {
    return this.http.get(Values.url + '/fee/getfeesforplayer/' + id).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(HttpHelper.handleErrorObservable);
  }

  createPlayer(player: Player) {
    return this.http.post(Values.url + '/player/create', player).map(HttpHelper.extractData)
      .catch(HttpHelper.handleErrorObservable);
  }

  updatePlayer(player: Player) {
    return this.http.post(Values.url + '/player/update', player).map(
      (res: Response) => {
        // this.changePlayer(player);
        return res.json();
      })
      .catch(HttpHelper.handleErrorObservable);
  }

  fetchPlayerGroups(id: number) {
    return this.http.get(Values.url + '/player/getgroups/' + id).map(HttpHelper.extractData)
      .catch(HttpHelper.handleErrorObservable);
  }

  deletePlayer(id: number) {
    return this.http.get(Values.url + '/player/delete/' + id).map(HttpHelper.extractData)
      .catch(HttpHelper.handleErrorObservable);
  }


  // changePlayer(player: Player) {
  //   if (isNullOrUndefined(this.players)) {
  //     this.players = [];
  //   }
  //   const objIndex = this.players.findIndex((obj => obj.Id === player.Id));
  //   if (objIndex !== -1) {
  //     this.players[objIndex] = player;
  //   } else {
  //     this.players.push(player);
  //   }
  // }

}
