'use strict'
const Frame = require('./Frame.js');

function BowlingGame() {
  let frame = Frame();
  return {
    roll : frame.roll,
    score : frame.score
  };
}

module.exports = BowlingGame;
