function createChessTimer(startBtnId, timerId, isWhite) {
    let timer;
    let seconds = 600; // 10 minutes
    let isRunning = false;
    let nextTimer;

    const startBtn = document.getElementById(startBtnId);
    const timerDisplay = document.getElementById(timerId);

    function startTimer() {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
        startNextTimer();
    }

    function updateTimer() {
        seconds--;
        if (seconds < 0) {
            stopTimer();
            alert(isWhite ? 'White player ran out of time!' : 'Black player ran out of time!');
            resetTimer();
        } else {
            displayTime();
        }
    }

    function displayTime() {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function resetTimer() {
        stopTimer();
        seconds = 600; // Reset to 10 minutes
        displayTime();
    }

    function startNextTimer() {
        if (nextTimer && !nextTimer.isRunning()) {
            nextTimer.start();
        }
    }

    startBtn.addEventListener('click', function () {
        if (isRunning) {
            stopTimer();
            startBtn.textContent = '';
        } else {
            startTimer();
            startBtn.textContent = '';
        }
    });

    return {
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
        isRunning: () => isRunning,
        setNextTimer: (next) => (nextTimer = next)
    };
}

function reset() {
    location.reload();
}

// Initialize timers
const whiteTimer = createChessTimer('startWhite', 'timerWhite', true);
const blackTimer = createChessTimer('startBlack', 'timerBlack', false);

whiteTimer.setNextTimer(blackTimer);
blackTimer.setNextTimer(whiteTimer);
