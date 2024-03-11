const pomodoroState = {
    timer: {
        currentCountTime: 25 * 60, //25 minutes in seconds
        isActive: false, // this is in session but paused
        isPaused: false, //paused or not
        currentMinutes: 0,
        currentSeconds: 0,
    },
    sessions: {
        sessionType: 'work',
        sessionDescription: '',
        workSessionsCount: 0,
        currentSession: 0,
        targetWorkSessionsBeforeLongBreak: 4,
    },
    settings: {
        workDuration: 25 * 60, //25 minutes in seconds
        shortBreakDuration: 5 * 60, //5 minutes in seconds
        longBreakDuration: 15 * 60 //15 minutes in seconds
    }
}




pomodoroState.timer.currentMinutes = Math.floor(pomodoroState.timer.currentCountTime / 60);
pomodoroState.timer.currentSeconds = pomodoroState.timer.currentCountTime % 60;



//declarations
const display = document.getElementById('timerDisplay');
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
let endInterval;





//functions

function updateUI() {
    if (pomodoroState.timer.isActive) { // update to reference pomodoroState.timer.isActive
        pauseButton.classList.add('show');
        startButton.classList.add('inactive');
    }
}

const timerActivate = () => {
    const { timer, sessions } = pomodoroState;
    timer.isActive = true;
    timer.currentSession = sessions.currentSession++;

};



timerPause = () => {
    const { timer } = pomodoroState;

    if (!timer.isPaused) {
        timer.isPaused = true;
        pauseButton.classList.add('paused');
        clearInterval(endInterval);
    } else {
        timer.isPaused = false; //unpause
        pauseButton.classList.remove('paused');
        // const display = document.getElementById('timerDisplay'); //display timer
        startTimer(timer.currentCountTime, display); //start timer from where it was paused
    }

}


function timerCount(timer) {
    pomodoroState.timer.currentCountTime = timer;
    pomodoroState.timer.currentMinutes = Math.floor(timer / 60);
    pomodoroState.timer.currentSeconds = timer % 60;
}






// # how to show tree two levels down with cli tree command. # tree -L 2

/* Event Listeners */

// start timer
document.getElementById('startButton').addEventListener('click', function() {
    const duration = 25 * 60; //25 minutes in seconds
    // const display = document.getElementById('timerDisplay'); //display timer
    startTimer(duration, display); //start timer
    timerActivate() //activate timer; ---maybe where we are failing
    updateUI();
})

function startTimer(duration, display) {
    let timer = duration,
        minutes, seconds;
    endInterval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `${minutes}:${seconds}`;


        if (--timer < 0) {
            clearInterval(endInterval);
            document.getElementById(breakPopup).style.display = 'block';
        }
        timerCount(timer);
        console.log(JSON.stringify(pomodoroState, null, 2));
    }, 1000)
}

function addClickListener(id, callback) {
    const element = document.querySelector(id);
    if (element) {
        element.addEventListener('click', callback);
    }
}

addClickListener('#pauseButton', function() {
    timerPause();
});

addClickListener('#resetButton', function() {
    // clearInterval(endInterval);
});

addClickListener('#takeBreak', function() {
    document.getElementById('breakPopup').style.display = 'none';
});


document.addEventListener('click', function() {
    console.log(JSON.stringify(pomodoroState, null, 2));

})


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
//     .then(response => response.json()) //parse the response as JSON
//     .then(data => console.log(data)); //data is the response from the server



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
//         const display = document.getElementById('timerDisplay'); //display timer
//         startTimer(timer.currentCountTime, display); //start timer
//     }
// };