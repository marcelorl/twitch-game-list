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
    { id: '', name: '', image: '', popularity: 1, viewers: 1 },
    { id: '', name: '', image: '', popularity: 2, viewers: 2 },
    { id: '', name: '', image: '', popularity: 3, viewers: 3 }
  ];

  const expectedGames = [
    { id: '', name: '', image: '', popularity: 3, viewers: 3 },
    { id: '', name: '', image: '', popularity: 2, viewers: 2 },
    { id: '', name: '', image: '', popularity: 1, viewers: 1 }
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
    btnPopularityEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const btnPopClasses = Array.from(btnPopularityEl.nativeElement.classList);
    const btnViewClasses = Array.from(btnViewEl.nativeElement.classList);

    expect(btnPopClasses.includes('active')).toBeTruthy();
    expect(btnViewClasses.includes('active')).toBeFalsy();
  });

  it('checks if class active is in views button', () => {
    btnViewEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const btnViewClasses = Array.from(btnViewEl.nativeElement.classList);
    const btnPopClasses = Array.from(btnPopularityEl.nativeElement.classList);

    expect(btnViewClasses.includes('active')).toBeTruthy();
    expect(btnPopClasses.includes('active')).toBeFalsy();
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
