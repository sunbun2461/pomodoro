const pomodoroState = {
    timer: {
        currentCountTime: 25 * 60, // 25 minutes in seconds
        isActive: false, // this is in session but paused
        isPaused: false, // paused or not
        currentMinutes: 0,
        currentSeconds: 0,
    },
    sessions: {
        sessionType: "work",
        sessionDescription: "", // user input
        currentSession: 0,
        completedWorkSessionsCount: 0,
        completedShortBreak: 0,
        completedLongBreak: 0,

        work: {
            completedWorkSessionsCount: 0,
            targetWorkSesssionsBeforeShortBreak: 1,
            targetShortBreaksBeforeLongBreak: 2,
        },
        breaks: {
            completedBreakSessionsCount: 0,
        },
    },
    settings: {
        workDuration: 25 * 60, // 25 minutes in seconds
        shortBreakDuration: 5 * 60, // 5 minutes in seconds
        longBreakDuration: 15 * 60, // 15 minutes in seconds
    },
};

//set here because cant use currentCountTime before its initialized which I was tyring to do
pomodoroState.timer.currentMinutes = Math.floor(
    pomodoroState.timer.currentCountTime / 60
);
pomodoroState.timer.currentSeconds = pomodoroState.timer.currentCountTime % 60;

// declarations
const timerDisplay = document.querySelector("#timerDisplay");
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");
const takeBreak = document.querySelector("#takeBreak");
const taskName = document.querySelector('#taskName')
let taskDisplayElement = document.querySelector(`.task-display__wrap li[data-id="1"]`)
const doc = document;
let endInterval;

// functions

function updateUI() {
    if (pomodoroState.timer.isActive) {
        // update to reference pomodoroState.timer.isActive
        pauseButton.classList.add("show");
        startButton.classList.add("grey-out");
    } else {
        pauseButton.classList.remove("show");
        startButton.classList.remove("grey-out");
    }
}

const timerActivate = () => {
    const { timer, sessions } = pomodoroState;
    timer.isActive = true;
    sessions.currentSession++;
};

timerPause = () => {
    const { timer } = pomodoroState;

    if (!timer.isPaused) {
        timer.isPaused = true;
        pauseButton.classList.add("paused");
        clearInterval(endInterval);
    } else {
        timer.isPaused = false; // unpause
        pauseButton.classList.remove("paused");
        // const display = document.getElementById('timerDisplay'); // display timer
        startTimer(timer.currentCountTime, timerDisplay); // start timer from where it was paused
    }
};

timerReset = () => {
    const { timer } = pomodoroState;
    timer.isActive = false;
    timer.isPaused = false;
    pauseButton.classList.remove("show");
    clearInterval(endInterval);
    timerCount(1500);
    timerDisplay.textContent = `${timer.currentMinutes}:${timer.currentSeconds}0`;
    updateUI();
};

const timerCount = (timer) => {
    pomodoroState.timer.currentCountTime = timer;
    pomodoroState.timer.currentMinutes = Math.floor(timer / 60);
    pomodoroState.timer.currentSeconds = timer % 60;
};


// start timer

const startTimer = (duration) => {
    let display = timerDisplay;
    console.log(display);
    let timer = duration,
        minutes,
        seconds;
    const updateTimer = () => {
        //   minutes = parseInt(timer / 60, 10)
        timerCount(timer);
        minutes = pomodoroState.timer.currentMinutes;
        console.log(minutes);
        seconds = pomodoroState.timer.currentSeconds;
        console.log(seconds);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `${minutes}:${seconds}`;
        timer--;
        if (timer < 0) {
            clearInterval(endInterval);
            timerReset();
            document.getElementById(breakPopup).style.display = "block";
        }
        console.log(JSON.stringify(pomodoroState, null, 2));
    };
    timer--;
    updateTimer();
    endInterval = setInterval(updateTimer, 1000);
};


const onTimerEnd = () => {};


/* Event Listeners */

function addClickListener(element, callback) {
    if (element) {
        element.addEventListener("click", callback);
    }
}

addClickListener(startButton, function() {
    const { sessions } = pomodoroState
    let taskValue = taskName.value
    console.log(taskValue)
    sessions.sessionDescription = taskValue
    taskDisplayElement.innerText = taskValue
    startTimer(pomodoroState.settings.workDuration); // start timer
    timerActivate(); // activate timer
    updateUI();
});

addClickListener(pauseButton, function() {
    timerPause();
});

addClickListener(resetButton, function() {
    timerReset();
});

addClickListener(takeBreak, function() {
    document.getElementById("breakPopup").style.display = "none";
});

addClickListener(doc, function() {
    console.log(JSON.stringify(pomodoroState, null, 2));
});


/* perl api */

// addClickListener('document', function() {
//     console.log(JSON.stringify(pomodoroState, null, 2));
// })

// fetch('scripts/perl/script.cgi', { /*explain how this works and what it does. # This is a POST request to the server, the server will run the script and return the result, which is then parsed as JSON, and then logged to the console., */
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         header: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             description: 'Task Description',
//             start_time: '2021-01-01 09:00:00'
//         })
//     })
//     .then(response => response.json()) // parse the response as JSON
//      .then(data => console.log(data)); // data is the response from the server

/* probably not needed */

// const timerPause = () => {
//     const { timer } = pomodoroState;
//     if (!timer.isPaused) {
//         timer.isPaused = true;
//         clearInterval(endInterval);
//     }
// };

// const timerResume = () => {
//     const { timer } = pomodoroState;
//     if (timer.isPaused) {
//         timer.isPaused = false;
//         const display = document.getElementById('timerDisplay'); // display timer
//         startTimer(timer.currentCountTime, display); // start timer
//     }
// };

// # how to show tree two levels down with cli tree command. # tree -L 2