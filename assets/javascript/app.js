// create our questions

var questions = [
  {
    question: "Capital city of Canada?",
    choiceA: "Ottawa",
    choiceB: "Toronto",
    choiceC: "Vancouver",
    correct: "A"
  },
  {
    question: "Captial city of Ontario?",
    choiceA: "Ottawa",
    choiceB: "Toronto",
    choiceC: "Vancouver",
    correct: "B"
  },
  {
    question: "Captial city of British Columbia?",

    choiceA: "Vancouver",
    choiceB: "Halifax",
    choiceC: "Victoria",
    correct: "C"
  },
  {
    question: "Captial city of Manitoba?",

    choiceA: "Winnipeg",
    choiceB: "Halifax",
    choiceC: "Victoria",
    correct: "A"
  },
  {
    question: "Captial city of Nova Scotia?",
    choiceA: "Winnipeg",
    choiceB: "Halifax",
    choiceC: "Victoria",
    correct: "B"
  }
];


// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreContainer = document.getElementById("scoreContainer");
var startOver = document.getElementById("startOver");

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

// Click to start the game

$("#startOver").hide();
$("#start").click(function () {
  $(this).hide();
  startQuiz();
});

function startQuiz() {
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = questionTime - count;
    timeGauge.style.width = (questionTime - count) * gaugeUnit + "px";
    count++
  } else {
    count = 0;
    // change progress color to red
    wrongAnswer();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    correctAnswer();
  } else {
    // answer is wrong
    // change progress color to red
    wrongAnswer();

  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
    $("#startOver").show();
  }
}
// ============================
//  Start Over function
// ============================


$("#startOver").click(function () {
  // console.log("startOver")
  // $(this).hide();
  // startQuiz();
  location.reload();
});

// answer is correct
function correctAnswer() {
  document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function wrongAnswer() {

  document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// score render
function scoreRender() {
  scoreContainer.style.display = "block";

  // calculate the amount of question percent answered by the user
  // const scorePerCent = Math.round(100 * score / questions.length);

  scoreContainer.innerHTML += "<p> Number of correct answer: " + score + "/"  + questions.length;
}

