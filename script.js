'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const currentPlayer1 = document.querySelector('#current--0');
const currentPlayer2 = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const imgDice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentPoint, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentPoint = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;

  imgDice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

init();

const handleSwitch = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentPoint = 0;
};

const roll = () => {
  if (playing) {
    const random = Math.floor(Math.random() * 6 + 1);
    currentPoint += random;
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${random}.png`;

    if (random !== 1) {
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentPoint;
    } else {
      handleSwitch();
    }
  }
};

const hold = () => {
  if (playing) {
    scores[activePlayer] += currentPoint;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    handleSwitch();
  }
};

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
