var scoresDiv = document.getElementById("scoreList");
var deleteButton = document.getElementById("delete");

function renderScores()
{
	const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
	scores.sort( function(a, b) { return b.score - a.score; } );
	for(let score of scores)
	{
		var liEl = document.createElement("li");
		liEl.textContent = score.name + " - " + score.score;
		scoresDiv.append(liEl);
	}
}

function deleteScores()
{
	localStorage.removeItem("quizScores");
	window.location.reload();
}

renderScores();
deleteButton.addEventListener("click", deleteScores);
