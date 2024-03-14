const pomodoroState = {
    timer: {
        currentCountTime: 25 * 60, // 25 minutes in seconds
        isActive: false, // this is in session but paused
        isPaused: false, // paused or not
        currentMinutes: 0,
        currentSeconds: 0,
    },
    sessions: {
        sessionType: ["work", "shortBreak", "longBreak"],
        sessionTypeActive: "work",
        sessionDescription: "", // user input
        currentSession: 0,
        completedWorkSessionsCount: 0,
        completedShortBreak: 0,
        completedLongBreak: 0,
        totalCompletedSessions: 0,
        work: {
            completedWorkSessionsCount: 0,
        },
        breaks: {
            completedBreakSessionsCount: 0,
            targetWorkSessionsBeforeShortBreak: 1,
            targetShortBreaksBeforeLongBreak: 2,
            breakModal: false,
        },
    },
    settings: {
        workDuration: 4 /* 25 * 60 */ , // 25 minutes in seconds
        shortBreakDuration: 4 /* 5 * 60 */ , // 5 minutes in seconds
        longBreakDuration: 4 /* 15 * 60 */ , // 15 minutes in seconds
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
const breakModalWrap = document.querySelector(".break-modal__wrap");
const takeBreak = document.querySelector("#takeBreak");
const taskName = document.querySelector("#taskName");
const breakModalShort = document.querySelector("#breakModalShort");
const breakModalLong = document.querySelector("#breakModalLong");
let taskDisplayElement = document.querySelector(
    `.task-display__wrap li[data-id="1"]`
);
const doc = document;
const body = document.querySelector("body");
let endInterval;
const onTimerEnd = () => {};



// functions

function updateUI() {
    const { timer, sessions } = pomodoroState;
    if (pomodoroState.timer.isActive) {
        // update to reference pomodoroState.timer.isActive
        pauseButton.classList.add("show");
        startButton.classList.add("grey-out");
    } else {
        pauseButton.classList.remove("show");
        startButton.classList.remove("grey-out");
    }
    if (sessions.breaks.breakModal) {
        breakModalWrap.classList.add("show");
        body.classList.add("hidden");
    } else {
        breakModalWrap.classList.remove("show");
        body.classList.remove("hidden");
    }
}



const startTimer = (duration, type) => {
    const { sessions } = pomodoroState;
    let display = timerDisplay;
    console.log(display);
    let timer = duration,
        minutes,
        seconds;
    // type[0] ? startButton.classList.add('grey-out') : startButton.classList.remove('grey-out');
    sessions.sessionTypeActive = type;
    startButton.classList.add("grey-out");
    pauseButton.classList.add("show");
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
            if (type === "work") {
                console.log("work")
                sessions.completedWorkSessionsCount++;
                breakModals(type);
            }
            if (type === "shortBreak") {
                sessions.completedShortBreak++;
                breakModals(type);

            }
            if (type === "longBreak") {
                sessions.completedLongBreak++;
                breakModals(type);
            }
            sessions.totalCompletedSessions++;
            clearInterval(endInterval);
            timerReset();
            updateUI();
        }
        console.log(JSON.stringify(pomodoroState, null, 2));
    };
    timer--;
    updateTimer();
    endInterval = setInterval(updateTimer, 1000);
};



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
    const { timer, sessions } = pomodoroState;
    timer.isActive = false;
    timer.isPaused = false;
    sessions.sessionTypeActive = null
    startButton.classList.remove("grey-out");
    pauseButton.classList.remove("show");
    clearInterval(endInterval);
    timerCount(1500);
    timerDisplay.textContent = `${timer.currentMinutes}:${timer.currentSeconds}0`;

};

const timerCount = (timer) => {
    pomodoroState.timer.currentCountTime = timer;
    pomodoroState.timer.currentMinutes = Math.floor(timer / 60);
    pomodoroState.timer.currentSeconds = timer % 60;
};

const breakModals = (type) => {
    const { sessions } = pomodoroState;
    type === "work" ? sessions.breaks.breakModal = true : sessions.breaks.breakModal = false;
    (sessions.totalCompletedSessions % 3 === 0) ? (breakModalLong.classList.add("show"), breakModalShort.classList.add("hide")) : (breakModalLong.classList.remove("show"), breakModalShort.classList.remove("hide"));
    updateUI();
};




/* Event Listeners */

function addClickListener(element, callback) {
    if (element) {
        element.addEventListener("click", callback);
    }
}

addClickListener(startButton, function() {
    const { timer, sessions, settings } = pomodoroState;
    let taskValue = taskName.value;
    console.log(taskValue);
    sessions.sessionDescription = taskValue;
    taskDisplayElement.innerText = taskValue;
    startTimer(settings.workDuration, sessions.sessionType[0]); // start timer
    timerActivate(); // activate timer
});

addClickListener(pauseButton, function() {
    timerPause();
});

addClickListener(resetButton, function() {
    timerReset();
});

addClickListener(takeBreak, function() {
    const { settings } = pomodoroState;
    breakModals();
    startTimer(settings.shortBreakDuration, "shortBreak");
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