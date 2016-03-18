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

function Frame(position) {
  let actualPosition = position || 1;
  let rolledPins = [];
  let nextFrame;

  function roll(pins) {
    if (!isFull()) return rolledPins.push(pins);
    getNextFrame().roll(pins);
  }

  function getNextFrame() {
    if (!nextFrame) nextFrame = Frame(actualPosition + 1);
    return nextFrame;
  }

  function score() {
    let score = rolledPins.reduce((first, second) => first + second, 0);
    if (nextFrame) {
      if (isStrike()) score += nextFrame.first() + nextFrame.second();
      else if (isSpare()) score += nextFrame.first();
      score += nextFrame.score();
    }
    return score;
  }

  function isFull() {
    if (actualPosition === 10) return false;
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
    if (isStrike()) return getNextFrame().first();
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
