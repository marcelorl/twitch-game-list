import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

import { TwitchService } from '../twitch.service';
import { Game } from '../game.model';

@Component({
  selector: 'app-search',
  template: '<input class="form-control" type="search" placeholder="Search" aria-label="Search" autofocus>'
})
export class SearchComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() games: EventEmitter<Game[]> = new EventEmitter<Game[]>();

  constructor(private twitchService: TwitchService, private el: ElementRef) { }

  ngOnInit(): void {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .debounceTime(500)
      .do(() => {
        this.games.emit([]);
        return this.loading.emit(true);
      })
      .map((keyword: string) => this.searchGames(keyword))
      .switch()
      .subscribe(
        (games: Game[]) => {
          this.loading.emit(false);
          this.games.emit(games);
        },
        (err: any) => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );
  }

  searchGames(keyword: string): Observable<Game[]> {
    if (!keyword) {
      return this.twitchService.getGames();
    }

    return this.twitchService.searchGames(keyword);
  }
}