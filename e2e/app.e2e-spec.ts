import { browser, ExpectedConditions } from 'protractor';

import { AppPage } from './app.po';

const EC = ExpectedConditions;

describe('twitch-game-list App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should start up the page', () => {
    page.navigateTo();

    expect(page.getTitle()).toEqual('TwitchGameList');
    expect(page.getLoadingImg().isPresent()).toBeTruthy();
    expect(page.getAppSearch().isPresent()).toBeTruthy();
    expect(page.getAppFilter().isPresent()).toBeTruthy();
    expect(page.getAppFilterButtonPopularity().isEnabled()).toBe(false);

    browser.wait(EC.visibilityOf(page.getGameList()), 4000);

    expect(page.getGameList().isPresent()).toBeTruthy();
    expect(page.getGameListItems().count()).toBe(99);
  });

  it('should filter by \'Counter\' keyword', () => {
    page.navigateTo();

    page.getAppSearchInput().sendKeys('Counter');

    expect(page.getGameListItems().count()).toBeLessThan(99);
  });

  it('should fetch no result when filtering by \'roso\' keyword', () => {
    page.navigateTo();

    page.getAppSearchInput().sendKeys('roso');

    expect(page.getContainerContent().getText()).toEqual('No Results');
  });

  it('should disable button views when clicked and enable button popularity', () => {
    page.navigateTo();

    page.getAppFilterButtonViews().click();

    expect(page.getAppFilterButtonPopularity().isEnabled()).toBe(true);
    expect(page.getAppFilterButtonViews().isEnabled()).toBe(false);
  });

  it('should disable button popularity when clicked and enable button views', () => {
    page.navigateTo();

    page.getAppFilterButtonViews().click();
    page.getAppFilterButtonPopularity().click();

    expect(page.getAppFilterButtonPopularity().isEnabled()).toBe(false);
    expect(page.getAppFilterButtonViews().isEnabled()).toBe(true);
  });

  it('should open game twitch further details', () => {
    page.navigateTo();

    const gameTitle = page.getGameListItemsFirstGame().getText();

    page.getGameListItemsFirstGame().click();

    browser.wait(EC.visibilityOf(page.getAppDetailsNav()), 4000);

    const gameTitleInDetailsNav = page.getAppDetailsNav().getText();

    expect(gameTitleInDetailsNav).toContain(gameTitle);
  });
});
