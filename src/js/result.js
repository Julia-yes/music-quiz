const result = document.querySelector(".result__warpper")

function createResultMessage() {  
  let resultText = document.querySelector(".result__text");
  if (resultText) {
    let resultMessage;
    let score = localStorage.score;
    if (score == 30) {
      resultMessage = `<div class = "result__message">Поздравляю!!!<br> Ты набрал максимальное количество баллов!</div>`
    }
    else {
      resultMessage = `<div class = "result__message">Ты набрал ${score} из 30 возможных баллов.<br> Желаешь попробовать ещё раз?</div>
      <a href="./game_page.html" class="result__link">Играть сначала</a>`
    }
    resultText.innerHTML = resultMessage
  }
  
}

if(result) {
  createResultMessage()
}
