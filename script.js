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

var time;
var timerId;
var score;
var startButton = document.getElementById('startButton');
var playAgainButton = document.getElementById('playAgain');
var instructionsEl = document.getElementById('instructions')
var initialsForm = document.getElementById('result');
var questionsEl = document.getElementById('questions');
var currentScoreEl = document.getElementById('currentScore');
var finalScoreEl = document.getElementById('score');
var timerEl = document.getElementById('timeRemaining');

const audioRight = new Audio('correct.wav');
const audioWrong = new Audio('incorrect.wav');

function playGame()
{
	score = 0;
	time = questions.length*10;
	currentScoreEl.textContent = `Score: ${score}`;
	hide(instructionsEl, initialsForm, playAgainButton);
	show(currentScoreEl, timerEl);
	timerId = setInterval(timeTick, 1000);
	renderQuestion();
}
//function hide( element ) { element.setAttribute('style', "display:none"); } // other way of doing it
function hide( ...elements ) { for( let element of elements ) element.style.display = "none"; }
function show( ...elements ) { for( let element of elements ) element.style.display = "block"; }
function renderQuestion( questionNumber = 0 )
{
	if( questionNumber >= questions.length )
		return gameOver();
	const { question, answers, correct } = questions[questionNumber];
	var title = document.createElement("h3");
	title.textContent = question;
	questionsEl.append(title);
	for(let i=0; i<answers.length; i++) // maybe should have used foreach or map instead?
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
		//if( time <= 0 ) return gameOver();
		audioRight.play(); console.log("Correct!");
		score += 20; currentScoreEl.textContent = `Score: ${score}`; questionsEl.innerHTML = '';
		renderQuestion(++quesNum);
	}
}
function handleAnswerWrong(quesNum)
{
	return function answerWrong()
	{
		//if( time <= 0 ) return gameOver();
		audioWrong.play(); console.log("Incorrect.");
		time -= 10; questionsEl.innerHTML = '';
		renderQuestion(++quesNum);
	}
}
function gameOver()
{
	show(initialsForm, playAgainButton);
	questionsEl.innerHTML = '';
	playAgainButton.style.display = "inline-block";
	finalScoreEl.innerHTML = ` <em>${score}</em>`;
	hide(currentScoreEl, timerEl);
	clearInterval(timerId);
}
function timeTick()
{
	time--;
	timerEl.textContent = time;
	if( time <= 0 )
	{
		audioWrong.play();
		gameOver();
	}
}
	
function updateScoreboard()
{
	event.preventDefault();
	audioRight.play();
	var scores = JSON.parse(localStorage.getItem("quizScores")) || [];
	const name = document.getElementById("initials").value.trim();
	document.getElementById("initials").value = "";
	scores.push({ name, score });
	localStorage.setItem( "quizScores", JSON.stringify(scores) );
	console.log("New score submitted.");
	window.location.href = "highscores.html";
}

startButton.addEventListener('click', playGame);
playAgainButton.addEventListener('click', playGame);
initialsForm.addEventListener('submit', updateScoreboard);

//localStorage.removeItem("quizScores");
