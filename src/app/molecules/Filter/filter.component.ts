import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { Game } from 'app/game.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
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
