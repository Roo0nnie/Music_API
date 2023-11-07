const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '429cbef36fmshf88967538fc9316p1fbea5jsne554239940ea',
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
  };
    fetch('https://genius-song-lyrics1.p.rapidapi.com/search/?q=bruno%20mars&per_page=10&page=1', options)
    .then(response => response.json())
    .then(response => result(response))
    .catch(err => console.error(err));
  
//   let track_list = [];
  
  function result(data) {
    for(var i = 0;i< data.hits.length;i++) {
        track_list.push({
            name: data.hits[i].result.full_title,
            artist: data.hits[i].result.artist_names,
            image: data.hits[i].result.header_image_url,
            path: data.hits[i].result.path
        })
    }
    
  }


let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
   
]
function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
        track_name.textContent = track_list[track_index].name;
        track_artist.textContent = track_list[track_index].artist;

    updateTimer = setInterval(1000);

    curr_track.addEventListener("ended", nextTrack);
    }

    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    
    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }
        
    function playTrack() {
        curr_track.play();
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
        
    function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
        
    function nextTrack() {
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;

        loadTrack(track_index);
        playTrack();
    }
        
    function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
  
        loadTrack(track_index);
        playTrack();
    }

    function seekTo() {

        seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
    }

loadTrack(track_index);





