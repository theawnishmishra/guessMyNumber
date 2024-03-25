'use strict';

let secretNumber, score, highScore;

const initialize = () => {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    score = 20;
    highScore = highScore || 0;
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.highscore').textContent = highScore;
};

const displayMessage = message => {
    document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);
    if (!guess) return displayMessage('No number!');
    
    if (guess === secretNumber) {
        displayMessage('Correct number');
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    } else {
        displayMessage(guess < secretNumber ? 'Too low!' : 'Too high!');
        score--;
        document.querySelector('.score').textContent = score;
    }
});

document.querySelector('.again').addEventListener('click', initialize);

initialize();
