import { Component, OnInit } from '@angular/core';

import { Game } from 'app/game.model';
import { TwitchService } from 'app/twitch.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  searchMode: boolean = false;
  loading: boolean = false;

  throttle = 500;
  scrollDistance = 0;
  scrollUpDistance = 2;

  constructor(private twitchService: TwitchService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.loading = true;

    this.twitchService.getGames()
      .subscribe(game => {
        this.games = game;
      });
  }

  onScrollDown(): void {
    if (this.searchMode) {
      return;
    }

    this.loading = true;

    this.twitchService.getGames(this.games.length)
      .subscribe(game => {
        this.games = this.games.concat(game);

        this.loading = false;
      });
  }

  gameLink(game: Game): Object {
    const queryString = {game: encodeURIComponent(JSON.stringify(game))};

    return queryString;
  }
}
