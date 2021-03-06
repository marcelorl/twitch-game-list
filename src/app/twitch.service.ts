import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from './game.model';
import { calcLimit } from 'app/helpers/helpers';

const httpOptions = {
  headers: new HttpHeaders({ 'Client-ID': '6rvivrxl0ww18gk6rh5dtvcr2nmz0j' })
};

@Injectable()
export class TwitchService {

  private twitchUrl = 'https://api.twitch.tv/kraken';

  constructor(private http: HttpClient) { }

  getGames(offset: number = 0): Observable<Game[]> {
    const queryString: string = [
      `limit=${calcLimit()}`,
      `offset=${offset}`
    ].join('&');

    return this.http.get(`${this.twitchUrl}/games/top?${queryString}`, httpOptions)
      .pipe(
        map(response =>
          response['top'].map(item =>
            new Game({
              id: item.game._id,
              name: item.game.name,
              image: item.game.box.large,
              popularity: item.game.popularity,
              viewers: item.viewers,
              channels: item.channels
            })
          )
            .sort((comp1, comp2) => comp2['popularity'] - comp1['popularity'])
        )
      );
  }

  searchGames(keyword: string): Observable<Game[]> {
    const queryString: string = [
      `type=suggest`,
      `query=${encodeURIComponent(keyword)}`
    ].join('&');

    return this.http.get(`${this.twitchUrl}/search/games?${queryString}`, httpOptions)
      .pipe(
        map(response =>
          response['games']
            .map(item =>
              new Game({
                id: item._id,
                name: item.name,
                image: item.box.large,
                popularity: item.popularity,
                viewers: item.viewers,
                channels: item.channels
              })
            )
            .sort((comp1, comp2) => comp2['popularity'] - comp1['popularity'])
        )
      );
  }
}
