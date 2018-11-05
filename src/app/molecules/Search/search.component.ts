import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TwitchService } from 'app/twitch.service';
import { Game } from 'app/game.model';

@Component({
  selector: 'app-search',
  template: `<input
              class="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              autofocus
              (keyup)="onSearchGame($event.target.value)" />
            `
  })
export class SearchComponent implements OnInit {
  private searchText$ = new Subject<string>();
  packages$;

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() games: EventEmitter<Game[]> = new EventEmitter<Game[]>();

  constructor(
    private twitchService: TwitchService
  ) { }

  ngOnInit(): void {
    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(_ => {
        this.games.emit([]);
        this.loading.emit(true);
        this.searchMode.emit(true);
      }),
      switchMap((keyword: string) =>
        this.searchGames(keyword)
      )
    )
      .subscribe((games: Game[]) => {
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

  onSearchGame (keyword: string) {
    this.searchText$.next(keyword);
  }

  searchGames(keyword: string): Observable<Game[]> {
    if (!keyword) {
      this.searchMode.emit(false);
      return this.twitchService.getGames();
    }

    return this.twitchService.searchGames(keyword);
  }
}
