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
        nextSessionAttempt: 0,
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
const takeLongBreak = document.querySelector("#takeLongBreak");
const taskName = document.querySelector("#taskName");
const breakModalShort = document.querySelector("#breakModalShort");
const breakModalLong = document.querySelector("#breakModalLong");
let taskDisplayElement = document.querySelector(
    `.task-display__wrap li[data-id="1"]`
);
const submitButton = document.querySelector("#submit");
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
            }
            if (type === "shortBreak") {
                sessions.completedShortBreak++;

            }
            if (type === "longBreak") {
                sessions.completedLongBreak++;
            }
            sessions.totalCompletedSessions++;
            sessions.nextSessionAttempt = sessions.totalCompletedSessions + 1;
            breakModals(type);
            console.log('nextSessionAttempt ' + sessions.nextSessionAttempt);
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
    (sessions.nextSessionAttempt > 3 && sessions.nextSessionAttempt % 3 === 0) ? (breakModalLong.classList.add("show"), breakModalShort.classList.add("hide")) : (breakModalLong.classList.remove("show"), breakModalShort.classList.remove("hide"));
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

    sendDataToServer(taskValue);
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


addClickListener(takeLongBreak, function() {
    const { settings } = pomodoroState;
    breakModals();
    startTimer(settings.longBreakDuration, "longBreak");
});

addClickListener(doc, function() {
    console.log(JSON.stringify(pomodoroState, null, 2));
});


addClickListener(submitButton, function(event) {
    event.preventDefault();
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(userName, password);
});

/* perl api */


function login(username, password) {
    return fetch('https://www.immaturegenius.com/pomodoro/scripts/perl/login.pl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // this is needed to send cookies
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

function signUp(username, password) {
    return fetch('https://www.immaturegenius.com/pomodoro/scripts/perl/signup.pl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

function insertTask(taskValue) {
    return fetch('https://www.immaturegenius.com/pomodoro/scripts/perl/insert_task.pl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: taskValue,
                start_time: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

fetch('https://www.immaturegenius.com/pomodoro/scripts/perl/api.pl')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))


// # how to show tree two levels down with cli tree command. # tree -L 2