import { Component, OnInit } from '@angular/core';

import { Game } from '../game.model';
import { TwitchService } from '../twitch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  loading: boolean = false;

  constructor(private twitchService: TwitchService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.twitchService.getGames()
      .subscribe(game => {
        this.games = game;

        return this.games;
      });
  }
}
