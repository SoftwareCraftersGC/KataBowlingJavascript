'use strict'

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
    return calculateFramePoints() + calculateExtraPoints();
  }

  function calculateExtraPoints() {
    let score = 0;
    if (nextFrame) {
      score += nextFrame.score();
      if (isSpare()) return score + nextFrame.firstRoll();
      if (isStrike()) return score + nextFrame.firstRoll() + nextFrame.secondRoll();
    }
    return score;
  }

  function calculateFramePoints() {
    return rolledPins.reduce((firstRoll, secondRoll) => firstRoll + secondRoll, 0);
  }

  function firstRoll() {
    return rolledPins[0];
  }

  function secondRoll() {
    if (isStrike() && !isLast()) return getNextFrame().firstRoll();
    return rolledPins[1];
  }

  function isFilledFrame() {
    return !isLast() && (isFullFrame() || isStrike());
  }

  function isFullFrame() {
    return rolledPins.length == 2;
  }

  function isSpare() {
    return firstRoll() + secondRoll() === 10;
  }

  function isStrike() {
    return firstRoll() === 10;
  }

  function isLast() {
    return actualFrameCount === MAXIMUM_NUMBER_OF_FRAMES;
  }

  return {
    roll : roll,
    firstRoll: firstRoll,
    secondRoll : secondRoll,
    score : score
  };
}

module.exports = Frame;
