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

function loadStream(index){
  if(playing && music !== null)
    destroyStream();

  music = new Audio();
  music.src = sources[index];
  music.load();
  music.play();
  setLabel(index);
  pauseIcon();
  playingIndex = index;
  playing = true;
}

function destroyStream(){
  music.pause();
  music.src = "";
  playIcon();
  playing = false;
}

function changePlayback(){
  if(playing){ destroyStream();  }else{  loadStream(playingIndex);  }
}

function setLabel(index){
  document.getElementById("label").innerHTML = '<h6> <a target="_blank" href="' + labels[index][1] + '">' + labels[index][0] + '</a></h6>';
}

document.onkeydown = function(e) {
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 32:
      changePlayback();
    break;
  }
};

// icons
function pauseIcon(){
  document.getElementById('playbackButton').className = 'icon fa-pause';
}
function playIcon(){
  document.getElementById('playbackButton').className = 'icon fa-play';
}
