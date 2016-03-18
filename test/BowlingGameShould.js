'use strict'
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

});

function BowlingGame() {
  let frame = Frame();
  return {
    roll : pins => {
      frame.roll(pins);
    },
    score : () => {
      return frame.score();
    }
  };
}

function Frame() {
  let rolledPins = [];
  let nextFrame;
  function roll(pins) {
    if (rolledPins.length == 2) {
      if (!nextFrame) nextFrame = Frame();
      nextFrame.roll(pins);
    } else {
      rolledPins.push(pins);
    }
  }

  function score() {
    let score = rolledPins.reduce((first, second) => first + second, 0);
    if (nextFrame) {
      if (isSpare()) score += nextFrame.first();
      score += nextFrame.score();
    }
    return score;
  }

  function isSpare() {
    return first() + second() === 10;
  }

  function first() {
    return rolledPins[0];
  }

  function second() {
    return rolledPins[1];
  }

  return {
    roll : roll,
    first: first,
    score : score
  };
}
