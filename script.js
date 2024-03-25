'use strict';

let secretNumber, score, highscore, timeLeft, countdown;

// Initialize game
const initializeGame = () => {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  resetTimer();
};

// Countdown timer
const startTimer = () => {
  timeLeft = 60;
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      endGame();
    } else {
      document.querySelector('.timer').textContent = timeLeft;
      timeLeft--;
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(countdown);
  document.querySelector('.timer').textContent = '60';
};

// Sound effects
const playSound = (id) => {
  const audio = document.getElementById(id);
  audio.play();
};

// Check guess
document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    document.querySelector('.message').textContent = 'No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct number';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    playSound('correct-sound');
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
      localStorage.setItem('highscore', highscore);
    }
    resetTimer();
  } else if (guess !== secretNumber) {
    const message = guess < secretNumber ? 'Too low!' : 'Too high!';
    document.querySelector('.message').textContent = message;
    score--;
    document.querySelector('.score').textContent = score;
    playSound('incorrect-sound');
  }
});

// Reset game
document.querySelector('.again').addEventListener('click', () => {
  initializeGame();
  startTimer();
});

// End game
const endGame = () => {
  document.querySelector('.message').textContent = 'Time\'s up! Game over.';
  document.querySelector('body').style.backgroundColor = '#ff4d4d';
  resetTimer();
};

// Initial setup
window.onload = () => {
  highscore = localStorage.getItem('highscore') || 0;
  document.querySelector('.highscore').textContent = highscore;
  initializeGame();
  startTimer();
};
