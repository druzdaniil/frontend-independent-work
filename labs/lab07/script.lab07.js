const DEFAULT_STATE = 'default';
const ANSWERS = ['yes', 'maybe', 'no'];
const STATES = [DEFAULT_STATE, ...ANSWERS];

const IMAGES_PATH = './img';
const MIN_QUESTION_LENGTH = 3;
const MAX_QUESTION_LENGTH = 120;

const elements = {};
let currentState = DEFAULT_STATE;

function createElement(tag, className, text = '') {
	const element = document.createElement(tag);
	element.className = className;
	element.textContent = text;
	return element;
}

function getRandomAnswer() {
	const options = ANSWERS.filter(answer => answer !== currentState);
	const index = Math.floor(Math.random() * options.length);
	return options[index];
}

function validateQuestion(value) {
	const question = value.trim();

	if (question.length < MIN_QUESTION_LENGTH) {
		return 'Please enter your question';
	}

	if (!question.endsWith('?')) {
		return 'A question should end with a "?"';
	}

	return '';
}

function showError(message) {
	elements.error.textContent = message;
	elements.input.classList.toggle('ask-form__input--invalid', message !== '');
	elements.input.setAttribute('aria-invalid', String(message !== ''));
}

function setBallState(state) {
	elements.ball.classList.replace(`ball--${currentState}`, `ball--${state}`);
	elements.ball.setAttribute('aria-label', `Magic Ball: State: ${state}`);
	currentState = state;
}

function handleSubmit(event) {
	event.preventDefault();

	const error = validateQuestion(elements.input.value);
	showError(error);

	if (error) {
		elements.input.focus();
		return;
	}

	setBallState(getRandomAnswer());
}

function buildBallImage(state) {
	const image = createElement('img', `ball__image ball__image--${state}`);
	image.src = `${IMAGES_PATH}/${state}.png`;
	image.alt = `Magic Ball: State: ${state}`;
	return image;
}

function buildBall() {
	const ball = createElement('div', `ball ball--${DEFAULT_STATE}`);
	
	ball.setAttribute('role', 'img');
	ball.setAttribute('aria-label', `Magic Ball: State: ${DEFAULT_STATE}`);
	
	STATES.forEach((state) => ball.appendChild(buildBallImage(state)));

   elements.ball = ball;

   return ball;
}

function buildForm() {
   const form = createElement('form', 'ask-form');
   const field = createElement('div', 'ask-form__field');
   const input = createElement('input', 'ask-form__input');
   const error = createElement('p', 'ask-form__error');
   const button = createElement('button', 'ask-form__btn', 'Ask the ball');

   input.type = 'text';
   input.placeholder = 'Ask your question here...';
   input.maxLength = MAX_QUESTION_LENGTH;
   input.autocomplete = 'off';
   input.setAttribute('aria-label', 'Your question');
   input.addEventListener('input', () => showError(''));

   button.type = 'submit';

   form.noValidate = true;
   form.addEventListener('submit', handleSubmit);

   field.appendChild(input);
   field.appendChild(error);
   form.appendChild(field);
   form.appendChild(button);

   elements.input = input;
   elements.error = error;

   return form;
}

function renderApp() {
   const app = createElement('main', 'app');

   app.appendChild(buildForm());
   app.appendChild(buildBall());

   document.body.appendChild(app);
}

renderApp();
