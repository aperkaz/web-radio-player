const sources = [
  "http://stream-dc1.radioparadise.com/aac-320", // paradise
  "http://radiogong-ais-edge-3073-fra-eco-cdn.cast.addradio.de/radiogong/live/mp3/high?ar-distributor=f0b7&aw_0_req.gdpr=true&_art=dj0yJmlwPTYyLjU3LjIuMjcmaWQ9aWNzY3hsLXMzeGRnenhtYiZ0PTE2MTAzODM3MDcmcz03ODY2ZjI5YyNiNzcwYWViOGUxZWU0NWI2MWJlNTAzZWE4OWUyZjQwYw", // party gong
  "http://ice2.somafm.com/folkfwd-128-mp3", // folk forward
  "http://94.23.26.22:8090/live.mp3" // punk fm
];

const labels = [
  [ "Radio Paradise", "https://www.radioparadise.com" ],
  [ "Party Gong", "https://www.radiogong.de/"],
  [ "SomaFM Folk Forward", "http://somafm.com/folkfwd/"],
  [ "Punk FM", " http://www.punkfm.co.uk/"]
];

let playingIndex = 0; // current radio
let playing = true; // stream status
let music = null;

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
