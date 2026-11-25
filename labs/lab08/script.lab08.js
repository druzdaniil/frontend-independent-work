const [userNameElement, computerNameElement] = document.querySelectorAll('.player__name');
const [userScoreElement, computerScoreElement] = document.querySelectorAll('.player__score');
const [userNumberElement, computerNumberElement] = document.querySelectorAll('.player__number');
const generateBtn = document.querySelector('.generate-btn');

const WINS_TO_END = 3;
const MAX_NUMBER = 6;
const MAX_NAME_LENGTH = 15;

let userName = 'User';
let userScore = 0;
let computerScore = 0;

function getUserName() {
    let name = prompt('Введіть ваше ім\'я:', '');

    while (name !== null && name.trim() === '') {
        name = prompt('Ім\'я не може бути порожнім. Введіть ваше ім\'я:', '');
    }

    if (name === null) {
        return 'User';
    }

    return name.trim().slice(0, MAX_NAME_LENGTH);
}

function getRandomNumber() {
    return Math.floor(Math.random() * MAX_NUMBER) + 1;
}

function renderScore() {
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    userNumberElement.textContent = '?';
    computerNumberElement.textContent = '?';
    renderScore();
}

function checkGameEnd() {
    if (userScore < WINS_TO_END && computerScore < WINS_TO_END) {
        return;
    }

    const winner = userScore === WINS_TO_END ? userName : 'Computer';

    setTimeout(() => {
        alert(`Гра завершена! Переможець: ${winner}`);
        resetGame();
    }, 50);
}

generateBtn.addEventListener('click', () => {
    const userNumber = getRandomNumber();
    const computerNumber = getRandomNumber();

    userNumberElement.textContent = userNumber;
    computerNumberElement.textContent = computerNumber;

    if (userNumber > computerNumber) {
        userScore++;
    } else if (computerNumber > userNumber) {
        computerScore++;
    }

    renderScore();
    checkGameEnd();
})

userName = getUserName();
userNameElement.textContent = userName;
computerNameElement.textContent = 'Computer';