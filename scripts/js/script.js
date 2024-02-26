fetch('scripts/perl/script.cgi', {
    method: 'POST',
    header: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({ 
        description: 'Task Description',
        start_time: '2021-01-01 09:00:00'
    })
})
.then(response => response.json())
.then(data => console.log(data));


document.getElementById('startTimer').addEventListener('click', function(){
    const duration = 25 * 60; //25 minutes in seconds
    const display = document.getElementById('timerDisplay');
    startTimer(duration, display);  
})

function startTimer(duration, display){
    let timer = duration, minutes, seconds;
    const endInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${minutes}:${seconds}`;

        if( --timer < 0 ){
            clearInterval(endInterval);
            document.getElementById(breakPopup).style.display = 'block';
        }
    }, 1000)
}

document.getElementById('takeBreak').addEventListener('click', function(){
    document.getElementById('breakPopup').style.display = 'none';
})