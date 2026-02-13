const sources = [
  "https://stream-dc1.radioparadise.com/aac-320", // paradise
  "https://radiogong-channel05.cast.addradio.de/radiogong/channel05/mp3/high?ar-distributor=f0b7", // party gong
  "https://ice2.somafm.com/folkfwd-128-mp3", // folk forward
  "https://ice2.somafm.com/u80s-128-mp3" // underground 80s
];

const labels = [
  [ "Radio Paradise", "https://www.radioparadise.com" ],
  [ "Party Gong", "https://www.radiogong.de/"],
  [ "SomaFM Folk Forward", "https://somafm.com/folkfwd/"],
  [ "SomaFM Underground 80s", "https://somafm.com/u80s/"]
];

let playingIndex = 0; // current radio
let playing = false; // stream status
let music = null;

function loadStream(index) {
  if (playing && music !== null)
    destroyStream();

  music = new Audio();
  music.src = sources[index];
  music.load();
  music.play();
  setLabel(index);
  showPauseIcon();
  playingIndex = index;
  playing = true;
}

function destroyStream() {
  music.pause();
  music.src = "";
  showPlayIcon();
  playing = false;
}

function changePlayback() {
  if (playing) { destroyStream(); } else { loadStream(playingIndex); }
}

function setLabel(index) {
  const labelEl = document.getElementById("label");
  labelEl.textContent = "";
  const h6 = document.createElement("h6");
  const a = document.createElement("a");
  a.target = "_blank";
  a.href = labels[index][1];
  a.textContent = labels[index][0];
  h6.appendChild(a);
  labelEl.appendChild(h6);
}

document.addEventListener("keydown", function(e) {
  if (e.key === " ") {
    e.preventDefault();
    changePlayback();
  }
});

// Station click handlers
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("[data-station]").forEach(function(el) {
    el.addEventListener("click", function() {
      loadStream(parseInt(this.dataset.station, 10));
    });
  });

  document.getElementById("playbackButton").addEventListener("click", function(e) {
    e.preventDefault();
    changePlayback();
  });
});

// icons
function showPauseIcon() {
  document.getElementById("playIcon").style.display = "none";
  document.getElementById("pauseIcon").style.display = "";
}

function showPlayIcon() {
  document.getElementById("playIcon").style.display = "";
  document.getElementById("pauseIcon").style.display = "none";
}
