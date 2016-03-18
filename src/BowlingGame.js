'use strict'

function BowlingGame() {
  let frame = Frame();
  return {
    roll : frame.roll,
    score : frame.score
  };
}

function Frame(position) {
  const MAXIMUM_NUMBER_OF_FRAMES = 10;
  const actualPosition = position || 1;
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
      if (isLast()) score += first() + second() + third();
      else if (isStrike()) score += nextFrame.first() + nextFrame.second();
      else if (isSpare()) score += nextFrame.first();
      score += nextFrame.score();
    }
    return score;
  }

  function isFull() {
    return !isLast() && (rolledPins.length == 2 || isStrike());
  }

  function isSpare() {
    return first() + second() === 10;
  }

  function isStrike() {
    return first() === 10;
  }

  function isLast() {
    return actualPosition === MAXIMUM_NUMBER_OF_FRAMES;
  }

  function first() {
    return rolledPins[0];
  }

  function second() {
    if (isStrike() && !isLast()) return getNextFrame().first();
    return rolledPins[1];
  }

  function third() {
    return rolledPins[2];
  }

  return {
    roll : roll,
    first: first,
    second : second,
    score : score
  };
}

module.exports = BowlingGame;
