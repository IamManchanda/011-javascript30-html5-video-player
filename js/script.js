/**
 * Scripts
 */

// Get our elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const enterFullscreen = player.querySelector('.player--enterFullscreen');
const exitFullscreen = player.querySelector('.player--exitFullscreen');

// Build out functions
function togglePlay() {
  const toggledObject = video.paused ? 'play' : 'pause';
  video[toggledObject]();
}

function updateButton() {
  const iconCondition = this.paused ? 'play' : 'pause';
  const icon = `<i class="fa fa-${iconCondition}" aria-hidden="true"></i>`
  toggle.innerHTML = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Source: https://davidwalsh.name/fullscreen
function launchIntoFullscreen() { 
  if(video.requestFullscreen)
    video.requestFullscreen();
  else if(video.mozRequestFullScreen)
    video.mozRequestFullScreen();
  else if(video.webkitRequestFullscreen)
    video.webkitRequestFullscreen();
  else if(video.msRequestFullscreen)
    video.msRequestFullscreen();
  enterFullscreen.style.display = 'none';
  exitFullscreen.style.display = 'block';
}

// Source: https://davidwalsh.name/fullscreen
function exitOutOfFullscreen() {
  if(document.exitFullscreen)
    document.exitFullscreen();
  else if(document.mozCancelFullScreen)
    document.mozCancelFullScreen();
  else if(document.webkitExitFullscreen)
    document.webkitExitFullscreen();
  enterFullscreen.style.display = 'block';
  exitFullscreen.style.display = 'none';
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', event => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
enterFullscreen.addEventListener('click', launchIntoFullscreen);
exitFullscreen.addEventListener('click', exitOutOfFullscreen);
