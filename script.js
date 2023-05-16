var startButton = document.getElementById('startButton');
var initialsForm = document.getElementById('result');
var questionsEl = document.getElementById('questions');

const audioRight = new Audio('mixkit-correct-answer-tone-2870.wav');
const audioWrong = new Audio('mixkit-wrong-electricity-buzz-955.wav');

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
	audioWrong.play();
	for( entry of questions)
	{
		var title = document.createElement("h3");
		title.textContent = entry.question;
		questionsEl.append(title);
		for(i=0; i<entry.answers.length; i++)
		{
			var answer = document.createElement("button");
			answer.textContent = entry.answers[i];
			questionsEl.append(answer);
		}
	}
}

function updateScoreboard()
{
	event.preventDefault();
	audioRight.play();
}

startButton.addEventListener('click', playGame);
initialsForm.addEventListener('submit', updateScoreboard);
