import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

import { Game } from '../game.model';

@Component({
  selector: 'app-filter',
  template: `
  <div class="d-flex align-items-center pr-3 mt-2">
    <div class="font-weight-bold mr-2">Filtrar por:</div>
    <div>
      <button
        type="button"
        id="btn-popularity"
        class="btn btn-outline-purple"
        [ngClass]="{'active': sortKey === 'popularity' }"
        (click)="sortGames('popularity')">
          Popularity
        </button>
      <button
        type="button"
        id="btn-views"
        class="btn btn-outline-purple"
        [ngClass]="{'active': sortKey === 'views' }"
        (click)="sortGames('views')">
          Views
        </button>
    </div>
  </div>
`
})
export class FilterComponent implements OnInit {
  @Output() gamesOutput: EventEmitter<Game[]> = new EventEmitter<Game[]>();
  @Input() games: Game[];

  public sortKey: string = 'popularity';

  constructor() { }

  ngOnInit(): void { }

  sortGames(sortKey: string): void {
    this.sortKey = sortKey;

    this.gamesOutput.emit(
      this.games.sort((comp1, comp2) => comp2[sortKey] - comp1[sortKey])
    );
  }
}
