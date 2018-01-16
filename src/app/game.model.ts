/**
 * SearchResult is a data-structure that holds an individual
 * record from a YouTube video search
 */
export class Game {
  id: string;
  name: string;
  image: string;
  popularity: number;
  viewers: number;
  channels: number;

  constructor(obj?: any) {
    this.id         = obj && obj.id         || null;
    this.name       = obj && obj.name       || null;
    this.image      = obj && obj.image      || null;
    this.popularity = obj && obj.popularity || 0;
    this.viewers    = obj && obj.viewers    || 0;
    this.channels   = obj && obj.channels    || 0;
  }
}
