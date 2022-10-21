const playPause = document.getElementById('playPause');
const prev = document.getElementById('prev');
const forward = document.getElementById('forward');
const audio = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const img = document.querySelector('img');


const musicData = [
{audio: 'music/jacinto-1.mp3', img: 'img/jacinto-1.jpg'},
{audio: 'music/jacinto-2.mp3', img: 'img/jacinto-2.jpg'},
{audio: 'music/jacinto-3.mp3', img: 'img/jacinto-3.jpg'},
{audio: 'music/metric-1.mp3', img: 'img/metric-1.jpg'},
{audio: 'music/babsSinging.mpeg', img: 'img/babs-img.jpeg'}];
let arrayPostion = 0;


let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let audioCurrentTime = 0;
let progressPercentage = 0;
let myInterval = 0;
let isPlaying = false;
// let duration = 0;





function playOrPauseAudio(){
    !isPlaying ? playMusic(): pauseMusic();
}

function playMusic() {
    isPlaying = true;
    audio.play()
    playPause.classList.replace('fa-play', 'fa-pause');
    playPause.title = 'pause';
}

function pauseMusic() {
    isPlaying = false;
    audio.pause()
    playPause.classList.replace('fa-pause', 'fa-play');
    playPause.title = 'play';
}

// progress bar animation 
function animateProgressBar(e) {
    let {currentTime, duration} = e.srcElement;   
    progressPercentage = ((currentTime/duration)*100);
    progressBar.style.width = progressPercentage + '%';
}
   
function displayDurationOfAudio(e) {
       duration = e.srcElement.duration;
    //    calculate audio duration 
       let minutes = Math.floor(duration/60);
       let seconds = Math.floor(duration % 60);
       seconds < 10 ? seconds = `0${seconds}`: seconds;
       let audioDuration = `${minutes}:${seconds}`;
       durationEl.innerHTML = audioDuration;

    }

    function displayCurrentTimeOfAudio(e) {
      let {currentTime} = e.srcElement;  
        // calculate audio current time
      let currentMinutes = Math.floor(currentTime/60);
      let currentSeconds = Math.floor(currentTime % 60);
      currentSeconds < 10 ? currentSeconds = `0${currentSeconds}`: currentSeconds;
      let audioCurrent = `${currentMinutes}:${currentSeconds}`;
      currentTimeEl.innerHTML = audioCurrent;
    }



// change audio file and image
function changeAudioAndImage(direction) {
    direction === 'forward' ? arrayPostion++ : arrayPostion--;
    arrayPostion > musicData.length-1 ? arrayPostion = 0 : arrayPostion;
    arrayPostion < 0 ? arrayPostion = musicData.length-1 : arrayPostion;
    // call below function to remove pause icon and set back play icon 
    playPause.classList.contains('fa-pause') ? playOrPauseAudio() : 0
    audio.src = musicData[arrayPostion].audio;
    img.src = musicData[arrayPostion].img;
    // set progress bar back to 0
    progressBar.style.width = '0%';
}

// end user can select a point on the progress bar to fast forward or go back on the audio file.
function selectPointOnProgressBar(e) {
    // set width of progress bar. This was calculated by viewing the event on the console and recording clientWidth property.
    let clientWidth = 360;
    // get position clicked by end user
    let positionClicked = e.offsetX;
    // the percentage value: where end user clicked against the full size of the progress bar container
    let positionPercentage = (positionClicked/clientWidth);
    // finding the associated percentage within the audio duration property.
    const {duration} = audio;
    let playAudioFrom = positionPercentage * duration;
    // playing the audio from position within the audio file calculated from above.
    audio.currentTime = playAudioFrom;
}


// Event listeners
playPause.addEventListener('click', playOrPauseAudio);

forward.addEventListener('click', () => {
    changeAudioAndImage('forward');
});

prev.addEventListener('click', () => {
    changeAudioAndImage('prev');
});


audio.addEventListener('loadedmetadata', displayDurationOfAudio);
audio.addEventListener('timeupdate', animateProgressBar);
audio.addEventListener('timeupdate', displayCurrentTimeOfAudio);
progressContainer.addEventListener('click', selectPointOnProgressBar);

