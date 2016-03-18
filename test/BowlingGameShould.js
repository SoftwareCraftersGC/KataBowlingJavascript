'use strict'

const BowlingGame = require('../src/BowlingGame.js');

const should = require('chai').should();

describe('BowlingGame Should', () => {

  let bowlingGame;

  beforeEach(() => {
    bowlingGame = BowlingGame();
  });

  it('have a score of 5 when 1 one pin is rolled and then 4 pins are rolled', () => {
    bowlingGame.roll(1);
    bowlingGame.roll(4);
    bowlingGame.score().should.equal(5);
  });

  it('have a score of 21 when the first 2 rolls are a spare', () => {
    bowlingGame.roll(6);
    bowlingGame.roll(4);
    bowlingGame.roll(4);
    bowlingGame.roll(3);
    bowlingGame.score().should.equal(21);
  });

  it('have a score of 24 when the first roll is a strike and the following ones are normal', () => {
    bowlingGame.roll(10);
    bowlingGame.roll(4);
    bowlingGame.roll(3);
    bowlingGame.score().should.equal(24);
  });

  it('have a score of 98 when is a normal game', () => {
    const rolls = [2, 3, 5, 5, 8, 1, 4, 2, 10, 5, 3, 6, 1, 6, 4, 3, 7, 1, 2];
    rolls.forEach(bowlingGame.roll);
    bowlingGame.score().should.equal(98);
  });

  it('have a score of 47 when there are two followed strikes', () => {
    const rolls = [10, 10, 3, 4];
    rolls.forEach(bowlingGame.roll);
    bowlingGame.score().should.equal(47);
  });

  it('have a score of 132 when the game is finished', () => {
    const rolls = [5, 5, 10, 10, 3, 5, 3, 5, 7, 1, 10, 5, 2, 6, 3, 2, 8, 4];
    rolls.forEach(bowlingGame.roll);
    bowlingGame.score().should.equal(132);
  });

  it('have a score of 300 when the game is finished', () => {
    const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    rolls.forEach(bowlingGame.roll);
    bowlingGame.score().should.equal(300);
  });

  it('have a score of 150 when the game is finished', () => {
    const rolls = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    rolls.forEach(bowlingGame.roll);
    bowlingGame.score().should.equal(150);
  });




});
