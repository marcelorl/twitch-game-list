import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from 'app/game.model';

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss']
})
export class DetailsComponent implements OnInit {
  game: Game;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.game = JSON.parse(decodeURIComponent(params.game));
      });
  }
}
