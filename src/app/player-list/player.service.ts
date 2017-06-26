import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Player} from '../model/player.model';
import {Observer} from 'rxjs/Observer';
@Injectable()
export class PlayerService {

  players: Player[];

  url = 'http://localhost:51194';

  constructor(private http: Http) {
  }

  // http://localhost:51194
  getAll() {
    if (this.players == null || this.players.length === 0) {
      console.log('returning fetched!');
      return this.fetchAllPlayers();
    } else {
      console.log('returning old!');
      return Observable.create((observer: Observer<Player[]>) => {
        observer.next(this.players);
      });
    }
  }

  fetchAllPlayers() {
    return this.http.get(this.url + '/players/getall').map(
      (response: Response) => {
        this.players = response.json();
        return response.json();
      }
    ).catch( this.handleErrorObservable );
  }

  setPlayers(players: Player[]) {
    this.players = players;
  }

  getPlayer(id: number) {
    if (this.players == null) {
      return this.fetchPlayer(id);
    }
    const pl = this.players.filter(x =>
      x.Id === id
    );
    if (pl != null && pl.length > 0) {
      return Observable.create((observer: Observer<Player>) => {
        observer.next(pl[0]);
      });
    } else {
      return this.fetchPlayer(id);
    }
  }

  fetchPlayer(id: number) {
    return this.http.get(this.url + '/players/get/' + id).map(
      (response: Response) => {
        return response.json();
      }
    ).catch( this.handleErrorObservable );
  }

  fetchPlayerFees(id: number) {
    return this.http.get(this.url + '/players/getfees/' + id).map(
      (response: Response) => {
        return response.json();
      }
    ).catch( this.handleErrorObservable );
  }

  createPlayer(player: Player) {
    return this.http.post(this.url + '/players/create', player).map( this.extractData )
      .catch( this.handleErrorObservable );
  }

  updatePlayer(player: Player) {
    return this.http.post(this.url + '/players/update', player).map( this.extractData )
      .catch( this.handleErrorObservable );
  }

  fetchPlayerGroups(id: number) {
    return this.http.get(this.url + '/players/getgroups/' + id).map( this.extractData )
      .catch( this.handleErrorObservable );
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    console.log('Something went wrong!');
    return Observable.throw(error.message || error);
  }


}
