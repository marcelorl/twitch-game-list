import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getContainerContent() {
    return element(by.css('.container.content'));
  }

  getLoadingImg() {
    return this.getContainerContent().element(by.css('img'));
  }

  getAppSearch() {
    return element(by.tagName('app-search'));
  }

  getAppSearchInput() {
    return this.getAppSearch().element(by.css('input'));
  }

  getAppFilter() {
    return element(by.tagName('app-filter'));
  }

  getAppFilterButtonPopularity() {
    return element.all(by.css('app-filter button')).first();
  }

  getAppFilterButtonViews() {
    return element.all(by.css('app-filter button')).get(1);
  }

  getGameList() {
    return this.getContainerContent().element(by.css('ul.game-list'));
  }

  getGameListItems() {
    return element.all(by.css('ul.game-list li'));
  }

  getGameListItemsFirstGame() {
    return this.getGameListItems().first().element(by.css('a div'));
  }

  getAppDetailsNav() {
    return element(by.css('app-details nav'));
  }
}
