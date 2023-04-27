const questions = [
  { question: "What is 4 + 2", answer: 6, response: [3, 4, 5, 6] },
  { question: "What is 3 + 2", answer: 5, response: [3, 4, 5, 6] },
];

const questionHeading = document.getElementById("question");
const questionContainer = document.getElementById("questions");
const submit = document.getElementById("submit");

function generateQuestion(i) {
  questionHeading.innerHTML = questions[i].question;
  questionContainer.innerHTML = "";
  questions[i].response.forEach((response) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const node = document.createTextNode(response);

    label.innerHtml += response;
    input.value = response;
    input.name = "response";
    input.type = "radio";

    label.appendChild(input);
    label.appendChild(input);
    label.appendChild(node);

    questionContainer.appendChild(label);
  });
}

var currentQuestion = 0;
generateQuestion(currentQuestion);

function checkAnswer(event) {
  event.preventDefault();

  const response = document.querySelector("input:checked").value;

  if (response == questions[currentQuestion].answer) {
    alert("COrrect");
    currentQuestion++;
    generateQuestion(currentQuestion);
  }
}

submit.addEventListener("click", checkAnswer);
