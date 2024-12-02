const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "creative style sheet", correct: false },
            { text: "computer style sheet", correct: false },
            { text: "coding style sheet", correct: false },
            { text: "cascading style sheet", correct: true },
        ]
    },
    {
        question: "Which HTML tag is used to define a hyperlink?",
        answers: [
            { text: "&lt;anchor&gt;", correct: false },
            { text: "&lt;a&gt;", correct: true },
            { text: "&lt;href&gt;", correct: false },
            { text: "&lt;link&gt;", correct: false },
        ]
    },
    {
        question: "What is the world's longest river?",
        answers: [
            { text: "nile river", correct: true },
            { text: "amazon river", correct: false },
            { text: "Mississippi River", correct: false },
            { text: "Yangtze River", correct: false },
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "beijing", correct: false },
            { text: "seoul", correct: false },
            { text: "bangkok", correct: false },
            { text: "tokyo", correct: true },
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "ibm", correct: false },
            { text: "netscape", correct: true },
            { text: "microsoft", correct: false },
            { text: "apple", correct: false },
        ]
    },
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();



