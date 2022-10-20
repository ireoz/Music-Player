const playPause = document.getElementById('playPause');
const audio = document.querySelector('audio');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');


let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;





function togglePlayPauseButton(){
    audio.paused ? playMusic(): pauseMusic();
}

function playMusic() {
    audio.play()
    playPause.classList.replace('fa-play', 'fa-pause');
    playPause.title = 'pause';
}

function pauseMusic() {
    audio.pause()
    playPause.classList.replace('fa-pause', 'fa-play');
    playPause.title = 'play';
}


function isPlaying() {
        displayCurrentTime()
        setInterval(displayCurrentTime, 1000)
        
    }
//  set correct time format and write current time to web page
function displayCurrentTime(){

   seconds = audio.currentTime.toFixed(0);
   seconds >= 60 ? minutes = (seconds/60).toFixed(0) : 0;
   minutes >= 1 ? seconds = seconds - 60 : 0;
   seconds < 10 ? seconds = '0' + seconds : seconds;
   let audioTime = `${minutes}:${seconds}`;
   currentTime.innerHTML = audioTime;

}

// Event listeners
playPause.addEventListener('click', togglePlayPauseButton);
audio.addEventListener('play', isPlaying);
