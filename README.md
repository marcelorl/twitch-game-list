# TwitchGameList

[![Build Status](https://travis-ci.org/marcelorl/twitch-game-list.svg?branch=master)](https://travis-ci.org/marcelorl/twitch-game-list)

## Overview

Project which pings Twitch API and fetches the top games being streamed.
It also has the ability to search for games and visualize its details.

## Tools

 - Twitch API
 - Angular 5
 - Bootstrap v4
 - Typescript
 - Sass
 - Jasmine
 - Atomic Design
 - Travis

## Commands

### Installation

`$ npm i`

### Development server

`$ npm start`

### Build

`$ npm run build`

### Running unit tests (watch mode)

`$ npm test`

### Running code coverage

`$ npm run coverage`

### Lint

`$ npm run lint`

### Deployment

I use Travis as CI tool. Then I make it `lint` and `test` before building, if anything goes wrong it wont let built
 files to be sent to the server [gh-pages in this case](https://marcelorl.github.io/twitch-game-list/).
