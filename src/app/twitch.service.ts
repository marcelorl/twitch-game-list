import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Game } from './game.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Client-ID': '6rvivrxl0ww18gk6rh5dtvcr2nmz0j' })
};

const calcLimit = () => {
  const width = window.innerWidth;
  if (width < 576) {
    return 25;
  } else if (width < 992) {
    return 50;
  }
  return 100;
};

const sortResultByDefaultKey = (filter: string) =>
  (comp1, comp2) => comp2[filter] - comp1[filter];

@Injectable()
export class TwitchService {

  private twitchUrl = 'https://api.twitch.tv/kraken';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get(`${this.twitchUrl}/games/top?limit=${calcLimit()}`, httpOptions)
      .map(response => {
        return <any>response['top'].map(item =>
          new Game({
            id: item.game._id,
            name: item.game.name,
            image: item.game.box.large,
            popularity: item.game.popularity,
            viewers: item.viewers
          })
        )
        .sort(sortResultByDefaultKey('popularity'));
      });
  }

  searchGames(keyword: string): Observable<Game[]> {
    const queryString: string = [
      `type=suggest`,
      `query=${encodeURI(keyword)}`
    ].join('&');

    return this.http.get(`${this.twitchUrl}/search/games?${queryString}`, httpOptions)
      .map(response => {
        return <any>response['games']
          .map(item =>
            new Game({
              id: item._id,
              name: item.name,
              image: item.box.large,
              popularity: item.popularity,
              viewers: item.viewers
            })
          )
          .sort(sortResultByDefaultKey('popularity'));
      });
  }
}
