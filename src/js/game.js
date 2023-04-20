import {Player} from "./player";
import { database } from "./database";
import {renderOptions, clickOption, changeCorrectColor, changeWrongColor} from "./options";
import {renderDescription} from "./description";

let game = document.querySelector(".game");
let playerMain;
let playerAside;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let correcrtAnswerNumber = getRandomInRange(0, 5);
let questionNumber = 1;
let questionArray = [];
let score = 0;
let points = 5;
let isWin = false;

function fillQuestionArray(data) {
  let start = (questionNumber-1)*6;
  let end = questionNumber*6;
  let array = [];
  for (let i = start; i < end; i++) {
    array.push(data[i])
  }
  questionArray = array
}

fillQuestionArray(database);

function highlightQuestion() {
  let questions = document.querySelectorAll(".game__item");
  for (let question of questions) {
    question.classList.remove("game__active")
  }
  questions[questionNumber-1].classList.add("game__active")
}

export async function showDescription(idOption) {
  let obj = questionArray.find(x => x.id == idOption);
  renderDescription(obj);
  const audioDescriptionTag = document.querySelector(".description__audio");
  let playerOption = new Player(idOption+"mini", audioDescriptionTag, obj.audio);
  playerAside = await playerOption;
}

function showCorrectAnswer() {
  let correctTitle = document.querySelector(".question__name");
  let correctImage = document.querySelector(".question__image");
  correctTitle.innerHTML=questionArray[correcrtAnswerNumber].name;
  correctImage.style.backgroundImage=`url("${questionArray[correcrtAnswerNumber].image}"`;
}

function changeScore() {
  let scoreNode = document.querySelector(".score__result");
  scoreNode.innerHTML = score
}

function buttonAbled() {
  let button = document.querySelector(".game__button");
  button.classList.remove("game__disabled");
  button.classList.add("game__button_able");
  button.removeAttribute("disabled");
}

function buttonDisbled() {
  let button = document.querySelector(".game__button");
  button.classList.add("game__disabled");
  button.classList.remove("game__button_able");
  button.setAttribute("disabled", "true");
}

export async function checkWin(optionId) {
  if (isWin == false) {
    if (optionId == questionArray[correcrtAnswerNumber].id) {    
      score += points;
      playCorrectSong();
      changeCorrectColor(optionId);
      showCorrectAnswer();
      changeScore();
      buttonAbled();
      isWin = true;
      playerMain.pause();
      playerMain.stopTimer();
      let buttonNextQuestion = document.querySelector(".game__button_able");
      buttonNextQuestion.addEventListener('click', changeQuestion);
    }
    else {
      if (isWin == false) {
        points--;
      }    
      playWrongSong();
      changeWrongColor(optionId);
    }
  }
}

function changeQuestion() {
  playerMain.pause();
  playerAside.pause();
  isWin = false;
  points = 5;
  if (questionNumber == 6) {
    localStorage.score = score;
    window.location.href = './result_page.html';
  }
  
  else {
    questionNumber++;
    correcrtAnswerNumber = getRandomInRange(0, 5);
    clearGameArea();
    fillQuestionArray(database);
    renderPlayer(questionArray[correcrtAnswerNumber].audio, questionArray[correcrtAnswerNumber].id);
    buttonDisbled();
  }
}

function playCorrectSong() {
  let audio = new Audio();
  audio.src = './assets/music/correct.mp3';
  audio.play();
}

function playWrongSong() {
  let audio = new Audio();
  audio.src = './assets/music/wrong.mp3';
  audio.play();
}

function clearGameArea() {
  let question__image = document.querySelector(".question__image");
  let question__name = document.querySelector(".question__name");
  let question__audio = document.querySelector(".question__audio");
  let option = document.querySelector(".options__description-wrapper");
  question__image.style.backgroundImage = null;
  question__name.innerHTML="*****";
  question__audio.innerHTML="";
  option.innerHTML="Послушайте музыку и выберите вариант ответа";

}

function renderPlayer(src, id) {
  const audioTag = document.querySelector(".question__audio");
  const player = new Player(id, audioTag, src);
  playerMain = player;
  renderOptions(questionArray);
  highlightQuestion();
  let options = document.querySelectorAll(".options__item");
  options.forEach((element) => {
    element.addEventListener('click', (event) => {
      if (playerAside) {
        playerAside.pause();
      }
      
      clickOption(event)});
  });
};

if (game) {
  renderPlayer(questionArray[correcrtAnswerNumber].audio, questionArray[correcrtAnswerNumber].id);

}

