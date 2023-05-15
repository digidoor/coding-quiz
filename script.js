var startButton = document.getElementById('startButton');
var enterScore = document.getElementById('result');

const audioRight = new Audio('mixkit-correct-answer-tone-2870.wav');
const audioWrong = new Audio('mixkit-wrong-electricity-buzz-955.wav');

function playGame()
{
	audioWrong.play();
}

function updateScoreboard()
{
	event.preventDefault();
	audioRight.play();
}

startButton.addEventListener('click', playGame);
enterScore.addEventListener('submit', updateScoreboard);
