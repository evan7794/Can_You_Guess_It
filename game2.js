let secretNumber;
let tries;
const maxTries = 5;
let pastGuesses = [];

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const remainingTries = document.getElementById('remainingTries');
const pastGuessesContainer = document.getElementById('pastGuesses');

function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    tries = 0;
    pastGuesses = [];
    updateRemainingTries();
    message.textContent = '';
    guessInput.value = '';
    guessBtn.style.display = 'block';
    resetBtn.style.display = 'none';
    guessInput.disabled = false;
    updatePastGuesses();
}

function updateRemainingTries() {
    remainingTries.textContent = `Remaining tries: ${maxTries - tries}`;
}

function updatePastGuesses() {
    pastGuessesContainer.innerHTML = pastGuesses.map(guess => 
        `<span class="past-guess">${guess}</span>`
    ).join('');
}

function checkGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    tries++;
    pastGuesses.push(guess);
    updateRemainingTries();
    updatePastGuesses();

    if (guess === secretNumber) {
        endGame(`Congratulations! You guessed the number ${secretNumber} in ${tries} tries.`, 'text-success');
        celebrate(); 
    } else if (tries >= maxTries) {
        endGame(`Game over. The number was ${secretNumber}.`, 'text-danger');
    } else if (guess < secretNumber) {
        message.textContent = 'Too low! Try a higher number.';
    } else {
        message.textContent = 'Too high! Try a lower number.';
    }

    guessInput.value = '';
}

function endGame(msg, className) {
    message.textContent = msg;
    message.className = `mt-3 text-center fw-bold ${className}`;
    guessBtn.style.display = 'none';
    resetBtn.style.display = 'block';
    guessInput.disabled = true;
}

function celebrate() {
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

guessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', initGame);
guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

initGame();
