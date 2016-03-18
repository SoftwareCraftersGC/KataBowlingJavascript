'use strict'

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
    if (rolledPins.length < 2) return rolledPins.push(pins);
    if (!nextFrame) nextFrame = Frame();
    return nextFrame.roll(pins);
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

module.exports = BowlingGame;
