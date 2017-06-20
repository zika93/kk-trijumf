import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Player} from '../model/player.model';
import {Observer} from 'rxjs/Observer';
@Injectable()
export class PlayerService {

  players: Player[];

  constructor(private http: Http) { }
  // http://localhost:51194
  getAll() {
    if (this.players == null || this.players.length === 0) {
      return this.fetchAllPlayers();
      } else {
      console.log('returning old!');
      return  Observable.create((observer: Observer<Player[]>) => {
        observer.next(this.players);
      });
    }
  }

  fetchAllPlayers() {
    return this.http.get('http://localhost:51194/players/getall').map(
  (response: Response) => {
    return response.json();
  }
  ).catch((error: Response) => {
    console.log('Something went wrong!');
    return Observable.throw(error);
  });
}

  setPlayers(players: Player[]){
      this.players = players;
  }

  getPlayer(id: number) {
    return this.http.get('http://localhost:51194/players/get/' + id).map(
      (response: Response) => {
        console.log(response);
        return response.json();
      }
    ).catch((error: Response) => {
      console.log('Something went wrong!');
      return Observable.throw(error);
    });
  }

  fetchPlayer(id: number) {
    return this.http.get('http://localhost:51194/players/get/' + id).map(
      (response: Response) => {
        console.log(response);
        return response.json();
      }
    ).catch((error: Response) => {
      console.log('Something went wrong!');
      return Observable.throw(error);
    });
  }

}
