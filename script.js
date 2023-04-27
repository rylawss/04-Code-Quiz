const questions = [
  { question: "What is 4 + 2", answer: 6, response: [3, 4, 5, 6] },
  { question: "What is 3 + 2", answer: 5, response: [3, 4, 5, 6] },
];

const questionHeading = document.getElementById("question");
const questionContainer = document.getElementById("questions");
const submit = document.getElementById("submit");
const score = document.getElementById("score");
const container = document.getElementById("container");
const startQuizButton = document.getElementById("startQuiz");
const quizOver = document.getElementById("quizOver");
const finalScore = document.getElementById("finalScore");
const indicator = document.getElementById("indicator");

container.style.display = "none";
quizOver.style.display = "none";

function generateQuestion(i) {
  questionHeading.innerHTML = questions[i].question;
  questionContainer.innerHTML = "";
  score.innerHTML = scoreValue;

  questions[i].response.forEach((response) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const node = document.createTextNode(response);

    label.innerHtml += response;
    input.value = response;
    input.name = "response";
    input.type = "radio";

    label.appendChild(input);
    label.appendChild(node);

    questionContainer.appendChild(label);
  });
}

function setIndicator(string) {
  indicator.innerHTML = string;

  setTimeout(() => (indicator.innerHTML = ""), 1500);
}

var currentQuestion = 0;
var scoreValue = 0;

function checkAnswer(event) {
  event.preventDefault();

  const response = document.querySelector("input:checked").value;

  if (response == questions[currentQuestion].answer) {
    scoreValue++;
    currentQuestion++;
    setIndicator("Correct");
  } else {
    currentQuestion++;
    timeLeft -= 10;
    setIndicator("Wrong!");
  }

  if (currentQuestion >= questions.length) {
    finalScore.innerHTML = scoreValue;
    container.style.display = "none";
    quizOver.style.display = "block";
  } else {
    generateQuestion(currentQuestion);
  }
}

const quizTimer = document.getElementById("timer");
var timeLeft = 60;

submit.addEventListener("click", checkAnswer);

function startQuiz() {
  startQuizButton.style.display = "none";
  generateQuestion(currentQuestion);

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  container.style.display = "block";
}

startQuizButton.addEventListener("click", startQuiz);

submitScore = document.getElementById("submitScore");
initials = document.getElementById("initials");

submitScore.addEventListener("click", function highscore() {
  if (initials.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = initials.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: scoreValue,
    };

    quizOver.style.display = "none";
    // highscoreContainer.style.display = "flex";
    // highscoreDiv.style.display = "block";
    // endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

const highScores = document.getElementById("highScores");
const highScoreList = document.getElementById("highScoreList");

function generateHighscores() {
  highScoreList.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("td");
    var newScoreSpan = document.createElement("td");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;

    // lemme finish this rq
    // we  just need to wrap the two columns in a table row

    var newScoreRow = document.createElement("tr");
    newScoreRow.appendChild(newNameSpan);
    newScoreRow.appendChild(newScoreSpan);

    highScoreList.appendChild(newScoreRow);

    // run it of fuck on sec run it yuuhhhhhhhhhhhhhhh
    // now we use bootstrap
  }
}
