const playPause = document.getElementById('playPause');
const audio = document.querySelector('audio');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress');



let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let audioCurrentTime = 0;
let audioTotalTime = 0;
let progressPercentage = 0;





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
//  set correct time format and write current time to the music player
function displayCurrentTime(){
   
   seconds = audio.currentTime.toFixed(0);
   seconds >= 60 ? minutes = (seconds/60).toFixed(0) : 0;
   minutes >= 1 ? seconds = seconds % 60 : 0;
   seconds < 10 ? seconds = '0' + seconds : seconds;
   audioCurrentTime = `${minutes}:${seconds}`;
   currentTime.innerHTML = audioCurrentTime;
   animateProgressBar();

}

// set correct time format and write song total time to the music player
function displayTotalTime() { 
  let tS = audio.duration.toFixed(0) % 60;
   let tM = (audio.duration/60).toFixed(0);
   tS < 10 ? tS = '0' + tS : tS;
   audioTotalTime = `${tM}:${tS}`;
   duration.innerHTML = audioTotalTime;

}

// progress bar animation 
function animateProgressBar() {
   let songCurrentTime = audio.currentTime;
   let songTotalTime = audio.duration;
   progressPercentage = ((songCurrentTime/songTotalTime)*100).toFixed(0);
   progressBar.style.width = progressPercentage + '%'
}

// Event listeners
playPause.addEventListener('click', togglePlayPauseButton);
audio.addEventListener('play', isPlaying);
audio.addEventListener('loadeddata', displayTotalTime);
