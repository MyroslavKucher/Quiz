const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'), 
      numberOfAllQuestion = document.getElementById('number-of-all-questions'); 

let indexOfQuestion, 
    indexOfPage = 0; 

const answersTracker = document.getElementById('answers-tracker'); 
const btnNext = document.getElementById('btn-next'); 

let score = 0; 

const correctAnswer = document.getElementById('correct-answer'), 
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), 
      btnTryAgain = document.getElementById('btn-try-again'); 

      const questions =[
        {
           question: 'Гравець якої позиції міняється з ліберо, виходячи на задню лінію?',
           options: [
              'Центральний блокуючий',
              'Пасуючий',
              'Догравальник',
              'Діагональний'
           ],
           rightAnswer: 0
        },
        {
           question: 'Гравець якої позиції зазвичай найвищий у команді?',
           options: [
              'Догравальник',
              'Пасуючий',
              'Центральний блокуючий',
              'Ліберо',
           ],
           rightAnswer: 2
        },
        {
           question: 'Гравець якої позиції найчастіше нападає із задньої лінії?',
           options: [
              'Ліберо',
              'Догравальник',
              'Центральний блокуючий',
              'Пасуючий',
           ],
           rightAnswer: 1
        },
        {
            question: 'Гравець якої позиції є основним атакуючим команди?',
            options: [
               'Ліберо',
               'Догравальник',
               'Центральний блокуючий',
               'Діагональний',
            ],
            rightAnswer: 3  
        }
     ];

numberOfAllQuestion.innerHTML = questions.length; 

let load = () => {
    question.innerHTML = questions[indexOfQuestion].question; 


    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; 
    indexOfPage++; 
};

let completedAnswers = []; 

let randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; 

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
};


const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled'); 
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status }`);
};

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам треба вибрати варіант відповіді');
    } else {
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', validate);
 
window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
 });