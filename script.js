var timer = 90;
var score = 0;
var startButton = document.getElementById('startButton');
var initialsForm = document.getElementById('result');
var questionsEl = document.getElementById('questions');
var scoreEl = document.getElementById('currentScore');

const audioRight = new Audio('correct.wav');
const audioWrong = new Audio('incorrect.wav');

var questions =
[
	{
		question: 'Commonly used data types DO NOT include:',
		answers: ['strings', 'booleans', 'alerts', 'numbers'],
		correct: 'alerts'
	},
	{
		question: 'The condition in an if / else statement is enclosed within ____.',
		answers: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
		correct: 'parentheses'
	},
	{
		question: 'Arrays in JavaScript can be used to store ____.',
		answers: [ 'numbers and strings', 'other arrays', 'booleans', 'all of the above' ],
		correct: 'all of the above'
	},
	{
		question: 'String values must be enclosed within ____ when being assigned to variables.',
		answers: ['commas', 'curly brackets', 'quotes', 'parentheses'],
		correct: 'quotes'
	},
	{
		question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
		answers: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
		correct: 'console.log'
	}
];

function playGame()
{
	renderQuestion();
}
function renderQuestion( questionNumber = 0 )
{
	if( questionNumber >= questions.length )
		return gameOver();
	const { question, answers, correct } = questions[questionNumber];
	var title = document.createElement("h3");
	title.textContent = question;
	questionsEl.append(title);
	for(i=0; i<answers.length; i++)
	{
		var answer = document.createElement("button");
		answer.textContent = answers[i];
		if( answers[i] == correct )
			answer.addEventListener('click', handleAnswerRight(questionNumber) );
		else
			answer.addEventListener('click', handleAnswerWrong(questionNumber) );
		questionsEl.append(answer);
	}
}
function handleAnswerRight(quesNum)
{
	return function answerRight()
	{
		audioRight.play();
		score += 20;
		scoreEl.textContent = score;
		renderQuestion(++quesNum);
	}
}
function handleAnswerWrong(quesNum)
{
	return function answerWrong()
	{
		audioWrong.play();
		timer -= 10;
		renderQuestion(++quesNum);
	}
}
	
//!! Try rendering the first question by using a default argument for the rendering! Pass the next question manually.

function updateScoreboard()
{
	event.preventDefault();
	audioRight.play();
}

startButton.addEventListener('click', playGame);
initialsForm.addEventListener('submit', updateScoreboard);
