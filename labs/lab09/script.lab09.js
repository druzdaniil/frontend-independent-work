const [userPlayer, computerPlayer] = document.querySelectorAll('.player');
const [userNameElement, computerNameElement] = document.querySelectorAll('.player__name');
const [userScoreElement, computerScoreElement] = document.querySelectorAll('.player__score');
const [userCardElement, computerCardElement] = document.querySelectorAll('.player__card');
const statusElement = document.querySelector('.game__status');
const generateBtn = document.querySelector('.generate-btn');

const CARDS_URL = './assets/cards.json';
const TOTAL_ATTEMPTS = 3;
const MAX_NAME_LENGTH = 15;

let cards = [];
let userName = 'User';
let userScore = 0;
let computerScore = 0;
let attempt = 0;
let isGameOver = false;

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

async function loadCards() {
   const response = await fetch(CARDS_URL);

   if (!response.ok) {
      throw new Error(`Помилка завантаження: ${response.status}`);
   }

   return response.json();
}

function getRandomCard() {
   return cards[Math.floor(Math.random() * cards.length)];
}

function showCard(cardElement, card) {
   cardElement.src = card.image;
   cardElement.alt = card.name;
   cardElement.classList.remove('player__card--hidden');
}

function hideCards() {
   userCardElement.classList.add('player__card--hidden');
   computerCardElement.classList.add('player__card--hidden');
}

function renderScore() {
   userScoreElement.textContent = userScore;
   computerScoreElement.textContent = computerScore;
}

function renderWinner() {
   const isUserWin = userScore > computerScore;
   const isComputerWin = computerScore > userScore;

   userPlayer.classList.toggle('player--winner', isUserWin);
   userPlayer.classList.toggle('player--loser', isComputerWin);
   computerPlayer.classList.toggle('player--winner', isComputerWin);
   computerPlayer.classList.toggle('player--loser', isUserWin);

   if (isUserWin) {
      statusElement.textContent = `Переміг ${userName}!`;
   } else if (isComputerWin) {
      statusElement.textContent = 'Переміг Computer!';
   } else {
      statusElement.textContent = 'Нічия!';
   }
}

function finishGame() {
   isGameOver = true;
   generateBtn.textContent = 'Нова гра';
   renderWinner();
}

function resetGame() {
   userScore = 0;
   computerScore = 0;
   attempt = 0;
   isGameOver = false;

   userPlayer.classList.remove('player--winner', 'player--loser');
   computerPlayer.classList.remove('player--winner', 'player--loser');

   hideCards();
   renderScore();
   statusElement.textContent = 'Натисніть Generate';
   generateBtn.textContent = 'Generate';
}

function playRound() {
   const userCard = getRandomCard();
   const computerCard = getRandomCard();

   showCard(userCardElement, userCard);
   showCard(computerCardElement, computerCard);

   userScore += userCard.value;
   computerScore += computerCard.value;
   attempt++;

   renderScore();
   statusElement.textContent = `Спроба ${attempt} з ${TOTAL_ATTEMPTS}`;

   if (attempt === TOTAL_ATTEMPTS) {
      finishGame();
   }
}

generateBtn.addEventListener('click', () => {
   if (isGameOver) {
      resetGame();
      return;
   }

   playRound();
})

async function initGame() {
   generateBtn.disabled = true;

   userName = getUserName();
   userNameElement.textContent = userName;
   computerNameElement.textContent = 'Computer';

   try {
      cards = await loadCards();
      generateBtn.disabled = false;
   } catch (error) {
      statusElement.textContent = 'Не вдалося завантажити карти';
      console.error(error);
   }
}

initGame();