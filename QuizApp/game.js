const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];


fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + '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',
    'Content-type': 'application/json'
  },
  // body: '{\n  "model": "gpt-3.5-turbo-1106",\n  "response_format": {\n    "type": "json_object"\n  },\n  "messages": [\n    {\n      "role": "system",\n      "content": "You are a helpful assistant designed to output JSON."\n    },\n    {\n      "role": "user",\n      "content": "make a quiz questions with answers based on space exploration and give atleast 10 questions make it multiple choice questions return it as a result of a request made by a browser inform of a json text which i can parse do not write naything extra in response to my request only json"\n    }\n  ]\n}',
  body: JSON.stringify({
    'model': 'gpt-3.5-turbo-1106',
    'response_format': {
      'type': 'json_object'
    },
    'messages': [
      {
        'role': 'system',
        'content': 'You are a helpful assistant designed to output JSON.'
      },
      {
        'role': 'user',
        'content': `make a quiz questions with answers based on space exploration and isro and nasa and give atleast 10 questions make it multiple choice questions return it as a result of a request made by a browser inform of a json text which i can parse use this json format while returning
        [
          {
            "question": "Inside which HTML element do we put the JavaScript??",
            "choice1": "<script>",
            "choice2": "<javascript>",
            "choice3": "<js>",
            "choice4": "<scripting>",
            "answer": 1
          },
          {
            "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
            "choice1": "<script href='xxx.js'>",
            "choice2": "<script name='xxx.js'>",
            "choice3": "<script src='xxx.js'>",
            "choice4": "<script file='xxx.js'>",
            "answer": 3
          },
          {
            "question": " How do you write 'Hello World' in an alert box?",
            "choice1": "msgBox('Hello World');",
            "choice2": "alertBox('Hello World');",
            "choice3": "msg('Hello World');",
            "choice4": "alert('Hello World');",
            "answer": 4
          }
        ]
        
         do not write naything extra in response to my request only `
      }
    ]
  })
}) 
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        var provided = loadedQuestions.choices[0].message.content;
        var data = JSON.parse(provided);
        
        var convertedData = data.questions.map(function (q) {
            return {
              "question": q.question,
              "choice1": q.choice1,
              "choice2": q.choice2,
              "choice3": q.choice3,
              "choice4": q.choice4,
              "answer": q.answer
            };
          });
          
          // Convert back to JSON
          questions = convertedData;
          
          // Print the result
          console.log(questions);
        
        startGame();
        
        
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
