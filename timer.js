function createChessTimer(startBtnId, timerId, isWhite) {
    let timer;
    let seconds = 600; // 10 minutes
    let isRunning = false;

    const startBtn = document.getElementById(startBtnId);
    const timerDisplay = document.getElementById(timerId);

    function startTimer() {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
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

    startBtn.addEventListener('click', function () {
        if (isRunning) {
            stopTimer();
            startBtn.textContent = 'Start';
        } else {
            startTimer();
            startBtn.textContent = 'Stop';
        }
    });

    return {
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
        isRunning: () => isRunning
    };
}

function reset() {
    location.reload()
}