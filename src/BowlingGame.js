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
    if (!isFull()) return rolledPins.push(pins);
    getNextFrame().roll(pins);
  }

  function getNextFrame() {
    if (!nextFrame) nextFrame = Frame();
    return nextFrame;
  }

  function score() {
    let score = rolledPins.reduce((first, second) => first + second, 0);
    if (nextFrame) {
      if (isStrike()) score += nextFrame.first() + nextFrame.second();
      if (isSpare()) score += nextFrame.first();
      score += nextFrame.score();
    }
    return score;
  }

  function isFull() {
    return rolledPins.length == 2 || isStrike();
  }

  function isSpare() {
    return first() + second() === 10;
  }

  function isStrike() {
    return first() === 10;
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
    second : second,
    score : score
  };
}

module.exports = BowlingGame;
