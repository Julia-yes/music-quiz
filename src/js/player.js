export class Player {
  constructor(id, path, audioPath) {
    const self = this;
    self.id = `player${id}`;

    self.createAudio(audioPath).then(audio => {
      self.isPlaying = false;
      self.activeTimer;
      self.playTime = 0;
      self.audio = audio;
      const playerNode = document.createElement('div');
      playerNode.className = `player player${self.id}`;
      playerNode.id = self.id; 
      self.html = self.renderHTML(audioPath);
      playerNode.innerHTML = self.html;
      path.append(playerNode);      
      self.setTimer();
      self.addListener();
    });
  }
  
  async createAudio(path) {
    const self = this;
    var music = new Audio();
    music.src = path;
    let promise = new Promise(function(resolve, reject) {
      music.onloadedmetadata = () => resolve(music);
      music.onerror = () => reject(error)
    });
    //let result = await promise;
    return promise;
  }

  renderHTML(audioPath) {
    const self = this;
    let mm = 0;
    let ss = 0;
    mm = Math.floor(Math.floor(self.audio.duration)/60);
    ss= Math.floor(self.audio.duration) - mm*60;
    if (mm < 10) {
      mm = "0" + mm
    };
    if (ss < 10) {
      ss = "0" + ss
    };  
    return `<audio src="${audioPath}" hidden preload="metadata"></audio>
    <div class="player__button">
      <svg class="player__svg" viewBox="-200 0 1200 1000">
        <path fill="#fe9b51" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path>
      </svg>
    </div>
    <div class="player__area">
      <div class="player__track-zone">
        <div class="player__line" style="background: linear-gradient(to right, #fe9b51 0%, #fe724f 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)"></div>
        <div class="player__circle" style="left: 0%"></div>
      </div>
      <div class="player__timer">
        <div class="player__start">00:00</div>
        <div class="player__end">${mm}:${ss}</div>
      </div>
      <div class="player__volume">
        <input type="range" min="0" max="1" value="1" step="0.1" class="player__range">
        <img src="./assets/img/volume1.png" alt = "volume" class="player__img">
      </div>
    </div>`
  }

  addListener() {
    const self = this;
    const button = document.querySelector(`.player${self.id} .player__button`);
    const range = document.querySelector(`.player${self.id} .player__range`);
    range.addEventListener("change", () => {self.changeValue()})
    button.addEventListener("click", () => {self.changeButtonImg()});
    button.addEventListener("click", () => {
      if (self.isPlaying) {
        self.pause();
      }
      else {
        self.play();
      }
    })
  }

  play() {
    const self = this;  
    self.audio.play();
    self.isPlaying = true;
  }

  pause() {
    const self = this;
    self.audio.pause();
    self.isPlaying = false;
  }

  playRoller() {    
    const self = this;
    let roller = document.querySelector(`.player${self.id} .player__track-zone`);
    let rollerPlace = self.playTime / self.audio.duration * 100;
    roller.innerHTML = `<div class="player__line" style="background: linear-gradient(to right, #fe9b51 0%, #fe724f ${rollerPlace}%, rgb(115, 115, 115) ${rollerPlace}%, rgb(115, 115, 115) 100%)"></div>
      <div class="player__circle" style="left: ${rollerPlace}%"></div>`  
  }

  setTimer() {
    const self = this;
    let timerText = document.querySelector(`.player${self.id} .player__start`);
    let buttonPlay = document.querySelector(`.player${self.id} .player__button`);
    let time = "00:00";
    let sec = 0; 
    let min = 0;
  
    function tick() {
        sec++;
        self.playTime++;
        if (sec >= 60) {
            sec = 0;
            min++;
        }
    }
  
    function add() {
        tick();
        time = `${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`;
        timerText.innerHTML = time;
        self.playRoller();
        timer();
    }
    
    function timer() {
      self.activeTimer = setTimeout(add, 1000);
    }
  
    buttonPlay.onclick = function() {
        if(self.isPlaying == true) {
          clearTimeout(self.activeTimer);
        }
        else {
          timer()
        }
    }   
  }

  stopTimer() {
    const self = this;
    clearTimeout(self.activeTimer);
  }

  changeButtonImg() {
    const self = this;
    let button = document.querySelector(`.player${self.id} .player__button`);
      if (self.isPlaying == true) {
        button.innerHTML=`<svg class="player__svg" viewBox="-200 0 1200 1000">
        <path fill="#fe9b51" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path>
        </svg>`;
      }
      else {
        button.innerHTML=`<svg class="player__svg" viewBox="0 0 47.607 47.607">
        <path fill="#fe9b51" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path>
        </svg>`;
      }
  }
  
  changeValue() {
    const self = this;
    let range = document.querySelector(`.player${self.id} .player__range`);
    self.audio.volume = range.value;
  }
}

