const STATE = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerID: setInterval(randomSquare, 500),
        countdownTimerID: setInterval(countdown, 1000),
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
}

function countdown() {
    STATE.values.currentTime--;
    STATE.view.timeLeft.textContent = STATE.values.currentTime

    if (STATE.values.currentTime <= 0) {
        alert("Game Over! Resultado: ", STATE.values.result)
    }
}

function playSound(audioName) {
    let audio = new Audio(`../src/assets/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare() {
    STATE.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = STATE.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    
    STATE.values.hitPosition =  randomSquare.id
}

function addListenerHitbox() {
    STATE.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if (square.id === STATE.values.hitPosition) {
                //STATE.view.enemy().classList.add("hit")
                STATE.values.result++
                STATE.view.score.textContent = STATE.values.result
                STATE.values.hitPosition = null;
                playSound("hit")
            }
        })
    })
}

function initialize() {
    addListenerHitbox()
}

initialize()
