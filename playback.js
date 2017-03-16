var sources = [
  "http://stream-dc1.radioparadise.com/aac-320", // paradise
  "http://mp3.radiogong963.c.nmdn.net/fs_radiogongchannel5/livestream.mp3", // party gong
  "http://ice2.somafm.com/folkfwd-128-mp3", // folk forward
  "http://46.28.49.164:7508/stream?1489669793611" // punk fm
];

var labels = [
  [ "Radio Paradise", "https://www.radioparadise.com" ],
  [ "Party Gong", "https://www.radiogong.de/"],
  [ "SomaFM Folk Forward", "http://somafm.com/folkfwd/"],
  [ "Punk FM", " http://www.punkfm.co.uk/"]
];

var playingIndex = 0; // current radio
var playing = true; // stream status
var music = null;

setTimeout(function(){
    loadStream(playingIndex);
}, 1);

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
