// Estado global do jogo, com referências às views (elementos DOM) e valores do jogo
const STATE = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        restartButton: document.querySelector("#restart")
    },
    values: {
        timerID: null,
        countdownTimerID: null,
        hitPosition: 0,
        result: 0,
        lives: 9,
        currentTime: 60,
    },
}

// Contador de tempo
function countdown() {
    STATE.values.currentTime--;
    STATE.view.timeLeft.textContent = STATE.values.currentTime

    if (STATE.values.currentTime <= 0) {
        endGame("O tempo acabou! Resultado: " + STATE.values.result);
    }
}

// Tocar efeitos sonoros durante o jogo
function playSound(audioName) {
    let audio = new Audio(`../src/assets/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

// Escolher quadrado aleatório no jogo
function randomSquare() {
    STATE.view.squares.forEach((square) => {
        square.classList.remove("hit")
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);

    while (randomNumber == STATE.values.hitPosition) {
        randomNumber = Math.floor(Math.random() * 9);
    }

    let randomSquare = STATE.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    STATE.values.hitPosition = randomSquare.id
}

// Tratar o clique no quadrado
function handleSquareClick(event) {
    const square = event.currentTarget;

    if (square.id === STATE.values.hitPosition) {
        STATE.values.result++
        STATE.view.score.textContent = STATE.values.result
        square.classList.add("hit")
        playSound("hit");
    } else {
        STATE.values.lives--
        STATE.view.life.textContent = `x${STATE.values.lives}`

        if (STATE.values.lives <= 0) {
            endGame("Você perdeu todas as vidas! Resultado: " + STATE.values.result);
        }
    }
}

// Adicionar os event listeners de clique aos quadrados
function addListenerHitbox() {
    STATE.view.squares.forEach((square) => {
        square.addEventListener("mousedown", handleSquareClick);
    })
}

// Remover os event listeners de clique aos quadrados
function removeListenerHitbox() {
    STATE.view.squares.forEach((square) => {
        square.removeEventListener("mousedown", handleSquareClick);
    })
}

// Resetar os estilos dos quadrados (remover classes 'hit' e 'enemy')
function resetStyles() {
    STATE.view.squares.forEach((square) => {
        square.classList.remove("enemy", "hit")
    })
}

// Terminar o jogo e limpar os timers
function endGame(message) {
    clearInterval(STATE.values.timerID);
    clearInterval(STATE.values.countdownTimerID);
    removeListenerHitbox();
    resetStyles();
    alert(message);
}

// Reiniciar os timers de quadrado aleatório e contador de tempo
function startGameTimers() {
    // Limpa qualquer timer anterior
    clearInterval(STATE.values.timerID);
    clearInterval(STATE.values.countdownTimerID);
    // Reinicia os intervalos
    STATE.values.timerID = setInterval(randomSquare, 500);
    STATE.values.countdownTimerID = setInterval(countdown, 1000);
}

// Resetar o estado do jogo (valores e exibição)
function resetGameState() {
    STATE.values.hitPosition = 0;
    STATE.values.result = 0;
    STATE.values.lives = 9;
    STATE.values.currentTime = 60;
    // Atualiza a interface
    STATE.view.score.textContent = STATE.values.result;
    STATE.view.life.textContent = `x${STATE.values.lives}`;
    STATE.view.timeLeft.textContent = STATE.values.currentTime;
}

// Reiniciar o jogo, resetando valores e timers
function restart() {
    resetGameState();
    startGameTimers();
    addListenerHitbox();
}

// Inicializar o jogo
function initialize() {
    STATE.view.restartButton.addEventListener("click", restart);
    startGameTimers();
    addListenerHitbox();
}

initialize()
