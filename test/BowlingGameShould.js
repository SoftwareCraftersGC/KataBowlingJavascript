'use strict'

const BowlingGame = require('../src/BowlingGame.js');

let should = require('chai').should();

describe('BowlingGame Should', () => {
  it('have a score of 5 when 1 one pin is rolled and then 4 pins are rolled', () => {
    let bowlingGame = BowlingGame();
    bowlingGame.roll(1);
    bowlingGame.roll(4);
    bowlingGame.score().should.equal(5);
  });

  it('have a score of 21 when the first 2 rolls are a spare', () => {
    let bowlingGame = BowlingGame();
    bowlingGame.roll(6);
    bowlingGame.roll(4);
    bowlingGame.roll(4);
    bowlingGame.roll(3);
    bowlingGame.score().should.equal(21);
  });

  it('have a score of  24 when the first roll is a strike and the following ones are normal', () => {
    let bowlingGame = BowlingGame();
    bowlingGame.roll(10);
    bowlingGame.roll(4);
    bowlingGame.roll(3);
    bowlingGame.score().should.equal(24);
  });

});
