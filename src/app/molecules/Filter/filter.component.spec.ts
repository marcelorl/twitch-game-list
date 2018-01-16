import {TestBed, ComponentFixture} from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('#Component: Filter', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let btnPopularityEl: DebugElement;
  let btnViewEl: DebugElement;

  const inputGames = [
    { id: '', name: '', image: '', popularity: 1, viewers: 1, channels: 1 },
    { id: '', name: '', image: '', popularity: 2, viewers: 2, channels: 1 },
    { id: '', name: '', image: '', popularity: 3, viewers: 3, channels: 1 }
  ];

  const expectedGames = [
    { id: '', name: '', image: '', popularity: 3, viewers: 3, channels: 1 },
    { id: '', name: '', image: '', popularity: 2, viewers: 2, channels: 1 },
    { id: '', name: '', image: '', popularity: 1, viewers: 1, channels: 1 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent]
    });

    fixture = TestBed.createComponent(FilterComponent);

    component = fixture.componentInstance;

    btnPopularityEl = fixture.debugElement.query(By.css('#btn-popularity'));
    btnViewEl = fixture.debugElement.query(By.css('#btn-views'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('checks if class active is in popularity button', () => {
    let gamesSorted;
    component.games = inputGames;
    component.gamesOutput.subscribe((value) => gamesSorted = value);

    btnPopularityEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const btnPopDisabled = btnPopularityEl.nativeElement.disabled;
    const btnViewDisabled = btnViewEl.nativeElement.disabled;

    expect(btnPopDisabled).toBeTruthy();
    expect(btnViewDisabled).toBeFalsy();
  });

  it('checks if class active is in views button', () => {
    let gamesSorted;
    component.games = inputGames;
    component.gamesOutput.subscribe((value) => gamesSorted = value);

    btnViewEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const btnViewDisabled = btnViewEl.nativeElement.disabled;
    const btnPopDisabled = btnPopularityEl.nativeElement.disabled;

    expect(btnViewDisabled).toBeTruthy();
    expect(btnPopDisabled).toBeFalsy();
  });

  it('sorts by popularity', () => {
    let gamesSorted;
    component.games = inputGames;
    component.gamesOutput.subscribe((value) => gamesSorted = value);

    btnPopularityEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(gamesSorted).toEqual(expectedGames);
  });

  it('sorts by views', () => {
    let gamesSorted;
    component.games = inputGames;
    component.gamesOutput.subscribe((value) => gamesSorted = value);

    btnViewEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(gamesSorted).toEqual(expectedGames);
  });
});
