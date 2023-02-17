'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnRules = document.querySelector('.rule');

const openModal = function () {
   modal.classList.remove('hidden');
   overlay.classList.remove('hidden');
};
const closeModal = function () {
   modal.classList.add('hidden');
   overlay.classList.add('hidden');
};

btnRules.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const fstPlayer0 = document.querySelector('.player--0');
const fstScore = document.getElementById('score--0');
const fstCurrent = document.getElementById('current--0');
const secPlayer1 = document.querySelector('.player--1');
const secScore = document.getElementById('score--1');
const secCurrent = document.getElementById('current--1');

const theDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// fstScore.textContent = 0;
// secScore.textContent = 0;
// fstCurrent.textContent = 0;
// secCurrent.textContent = 0;

let scores, currentScore, activePlayer, playing;

const init = function () {



   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   fstScore.textContent = 0;
   secScore.textContent = 0;
   fstCurrent.textContent = 0;
   secCurrent.textContent = 0;

   theDice.classList.add('hidden');
   fstPlayer0.classList.remove('player--winner');
   secPlayer1.classList.remove('player--winner');
   fstPlayer0.classList.add('player--active');
   secPlayer1.classList.remove('player--active');
};
init();

const switchPlayer = function () {

   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   fstPlayer0.classList.toggle('player--active');
   secPlayer1.classList.toggle('player--active');
};

// fstPlayer0.classList.toggle('player--active');

btnRoll.addEventListener('click', function () {
   if (playing) {

      const dice = Math.trunc(Math.random() * 6) + 1;
      theDice.classList.remove('hidden');
      theDice.src = `dice-${dice}.png`;

      if (dice !== 1) {
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
      } else {
         switchPlayer();
      }
   }
});


btnHold.addEventListener('click', function () {
   if (playing) {


      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
      // document.getElementById(`current--${activePlayer}`).textContent = scores[activePlayer];

      if (scores[activePlayer] >= 20) {
         playing = false;
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
         document.getElementById(`score--${activePlayer}`).textContent = ('winner!!!');
         theDice.classList.add('hidden')
      } else {
         switchPlayer();
      }

      // switchPlayer(); 
   }

});

btnNew.addEventListener('click', init);