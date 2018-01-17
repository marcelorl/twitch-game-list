import { Game } from 'app/game.model';

describe('#Game.model', () => {
  it('should return all default values for Game model', () => {
    const gameInstance = new Game();

    expect(JSON.stringify(gameInstance))
      .toEqual(JSON.stringify({id: null, name: null, image: null, popularity: 0, viewers: 0, channels: 0}));
  });

  it('should return the values sent for Game model', () => {
    const gameValues = {id: '123', name: 'test', image: 'test', popularity: 1, viewers: 2, channels: 3};
    const gameInstance = new Game(gameValues);

    expect(JSON.stringify(gameInstance))
      .toEqual(JSON.stringify(gameValues));
  });
});
