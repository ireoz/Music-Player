const playPause = document.getElementById('playPause');
const prev = document.getElementById('prev');
const forward = document.getElementById('forward');
const audio = document.querySelector('audio');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress');
const img = document.querySelector('img');


const musicData = [
{audio: 'music/jacinto-1.mp3', img: 'img/jacinto-1.jpg'},
{audio: 'music/jacinto-2.mp3', img: 'img/jacinto-2.jpg'},
{audio: 'music/jacinto-3.mp3', img: 'img/jacinto-3.jpg'},
{audio: 'music/metric-1.mp3', img: 'img/metric-1.jpg'}];
let arrayPostion = 0;


let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let audioCurrentTime = 0;
// let audioTotalTime = 0;
let progressPercentage = 0;





function togglePlayPauseButton(){
    audio.paused || audio.ended ? playMusic(): pauseMusic();
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
   let audioTotalTime = `${tM}:${tS}`;
   duration.innerHTML = audioTotalTime;

}

// progress bar animation 
function animateProgressBar() {
   let songCurrentTime = audio.currentTime;
   let songTotalTime = audio.duration;
   progressPercentage = ((songCurrentTime/songTotalTime)*100).toFixed(0);
   progressBar.style.width = progressPercentage + '%'
}


// change audio file and image
function changeAudioAndImage(direction) {
    direction === 'forward' ? arrayPostion++ : arrayPostion--;
    arrayPostion > musicData.length-1 ? arrayPostion = 0 : arrayPostion;
    arrayPostion < 0 ? arrayPostion = musicData.length-1 : arrayPostion;
    // call below function to remove pause 
    playPause.classList.contains('fa-pause') ? togglePlayPauseButton() : 0
    audio.src = musicData[arrayPostion].audio;
    img.src = musicData[arrayPostion].img;
}


// Event listeners
playPause.addEventListener('click', togglePlayPauseButton);

forward.addEventListener('click', () => {
    changeAudioAndImage('forward');
});

prev.addEventListener('click', () => {
    changeAudioAndImage('prev');
});

audio.addEventListener('play', isPlaying);
audio.addEventListener('loadedmetadata', displayTotalTime);


