'use strict'
let should = require('chai').should();

describe('BowlingGame Should', () => {
  it('have a score of 2 when 2 pins are rolled', () => {
    let bowlingGame = BowlingGame();
    bowlingGame.roll(2);
    bowlingGame.score().should.equal(2);
  });

  it('have a score of 4 when 2 pints are rolled and then another 2 pins are rolled', () => {
    let bowlingGame = BowlingGame();
    bowlingGame.roll(2);
    bowlingGame.roll(2);
    bowlingGame.score().should.equal(4);
  });
});

function BowlingGame() {
  let score = 0;
  return {
    roll : pins => score += pins,
    score : () => score
  };
}
