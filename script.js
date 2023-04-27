const questions = [
  {
    question: "What is 4 + 2",
    answer: "test",
    response: ["test", "tasdfa", "asdfasdf", "asdfasdf"],
  },
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
const quizTimer = document.getElementById("timer");
const submitScore = document.getElementById("submitScore");
const initials = document.getElementById("initials");
const highScores = document.getElementById("highScores");
const highScoreList = document.getElementById("highScoreList");
const clearHighScoreButton = document.getElementById("clear");
const replay = document.getElementById("replay");

const quizTime = 100;

//starts quiz and timer on button press
function startQuiz() {
  currentQuestion = 0;
  scoreValue = 0;
  timeLeft = quizTime;

  quizTimer.textContent = "Time left: " + timeLeft;
  startQuizButton.style.display = "none";
  container.style.display = "block";
  highScores.style.display = "none";
  generateQuestion(currentQuestion);

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  finalScore.innerHTML = scoreValue;
  container.style.display = "none";
  quizOver.style.display = "block";
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

//generates the questions of the quiz through the array declared above
function generateQuestion(i) {
  questionHeading.innerHTML = questions[i].question;
  questionContainer.innerHTML = "";
  score.innerHTML = scoreValue;

  const randomizedResponses = shuffle(questions[i].response);

  randomizedResponses.forEach((response) => {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("form-check");
    const label = document.createElement("label");
    label.classList.add("form-check-label");
    const input = document.createElement("input");
    input.classList.add("form-check-input");

    const node = document.createTextNode(response);

    label.innerHtml += response;
    input.value = response;
    input.name = "response";
    input.type = "radio";

    label.appendChild(input);
    label.appendChild(node);

    inputWrapper.appendChild(label);

    questionContainer.appendChild(inputWrapper);
  });
}
//indicates if the question was answered correctly or not
function setIndicator(string) {
  indicator.innerHTML = string;

  setTimeout(() => (indicator.innerHTML = ""), 1500);
}

//checks if the answer submitted is correct
function checkAnswer(event) {
  event.preventDefault();

  const response = document.querySelector("input:checked").value;

  if (response == questions[currentQuestion].answer) {
    scoreValue++;

    setIndicator("Correct");
  } else {
    timeLeft -= 10;
    setIndicator("Wrong!");
  }

  currentQuestion++;

  if (currentQuestion >= questions.length || timeLeft <= 0) {
    endQuiz();
  } else {
    generateQuestion(currentQuestion);
  }
}

function highscore() {
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
    highScores.style.display = "block";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
}

function generateHighscores() {
  highScoreList.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

  for (i = 0; i < highscores.length && i <= 4; i++) {
    var newNameSpan = document.createElement("td");
    var newScoreSpan = document.createElement("td");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;

    var newScoreRow = document.createElement("tr");
    newScoreRow.appendChild(newNameSpan);
    newScoreRow.appendChild(newScoreSpan);

    highScoreList.appendChild(newScoreRow);
  }
}

function clearHighScore() {
  localStorage.clear();
  highScoreList.innerHTML = "";
}

function retryQuiz() {
  highScores.style.display = "none";
  startQuizButton.style.display = "block";
}

function addListeners() {
  replay.addEventListener("click", retryQuiz);
  clearHighScoreButton.addEventListener("click", clearHighScore);
  startQuizButton.addEventListener("click", startQuiz);
  submitScore.addEventListener("click", highscore);
  submit.addEventListener("click", checkAnswer);
}

function init() {
  // Hide All Sections besides Start button
  container.style.display = "none";
  quizOver.style.display = "none";
  highScores.style.display = "none";

  var currentQuestion = 0;
  var scoreValue = 0;
  var timeLeft = quizTime;

  addListeners();
}

init();
