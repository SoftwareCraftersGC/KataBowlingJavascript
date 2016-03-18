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
  const actualFrameCount = position || 1;
  let rolledPins = [];
  let nextFrame;

  function roll(pins) {
    if (!isFilledFrame()) return rolledPins.push(pins);
    getNextFrame().roll(pins);
  }

  function getNextFrame() {
    if (!nextFrame) nextFrame = Frame(actualFrameCount + 1);
    return nextFrame;
  }

  function score() {
    let score = rolledPins.reduce((first, second) => first + second, 0);
    if (nextFrame) {
      score += nextFrame.score();
      if (isSpare()) return score + nextFrame.first();
      if (isStrike()) return score + nextFrame.first() + nextFrame.second();
    }
    return score;
  }

  function first() {
    return rolledPins[0];
  }

  function second() {
    if (isStrike() && !isLast()) return getNextFrame().first();
    return rolledPins[1];
  }

  function isFilledFrame() {
    return !isLast() && (isFullFrame() || isStrike());
  }

  function isFullFrame() {
    return rolledPins.length == 2;
  }

  function isSpare() {
    return first() + second() === 10;
  }

  function isStrike() {
    return first() === 10;
  }

  function isLast() {
    return actualFrameCount === MAXIMUM_NUMBER_OF_FRAMES;
  }

  return {
    roll : roll,
    first: first,
    second : second,
    score : score
  };
}

module.exports = BowlingGame;
