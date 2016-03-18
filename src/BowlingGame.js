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
    if (!isFull()) return rolledPins.push(pins);
    getNextFrame().roll(pins);
  }

  function getNextFrame() {
    if (!nextFrame) nextFrame = Frame(actualFrameCount + 1);
    return nextFrame;
  }

  function score() {
    return calculateScore();
  }

  function calculateScore() {
    let score = rolledPins.reduce((first, second) => first + second, 0);
    if (nextFrame) {
      score += nextFrame.score();
      if (isLast()) return score * 2;
      if (isStrike()) return score + nextFrame.first() + nextFrame.second();
      if (isSpare()) return score + nextFrame.first();
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
    return actualFrameCount === MAXIMUM_NUMBER_OF_FRAMES;
  }

  function first() {
    return rolledPins[0];
  }

  function second() {
    if (isStrike() && !isLast()) return getNextFrame().first();
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
