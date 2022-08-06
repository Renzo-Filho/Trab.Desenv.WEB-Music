let music_library = [
    {
        title: 'Have You Ever Seen The Rain?', artist: 'Creedence Clearwater Revival',
        src: 'Musics/Creedence Clearwater Revival - Have You Ever Seen The Rain.mp3', id: '0'
    },

    { title: 'Back In Black', artist: 'AC/DC', src: 'Musics/AC_DC - Back In Black.mp3', id: '1' },

    {
        title: 'I Cant Get No (Satisfaction)', artist: 'The Rolling Stones',
        src: 'Musics/The Rolling Stones - (I Cant Get No) Satisfaction.mp3', id: '2'
    },

    { title: 'Sweet Child O Mine', artist: 'Guns N Roses', src: 'Musics/Guns N Roses - Sweet Child O Mine.mp3', id: '3' }
];

let musicIndex = 0;
let music = document.querySelector('audio');
let musicDuration = document.querySelector('.final');
let btnPlayMusic = document.querySelector('.playMusic');

newMusic(musicIndex);

// eventos

document.querySelectorAll('.playMusic').forEach(musica => { musica.addEventListener('click', a => { getMusicToPlay(a) }); })

document.querySelector('.btn-play').addEventListener('click', playMusic);
document.querySelector('.btn-pause').addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', musicProgress);

document.querySelector('.back').addEventListener('click', () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = music_library.length - 1;
    }
    newMusic(musicIndex);
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('.btn-play').style.display = 'block';
});

document.querySelector('.next').addEventListener('click', () => {
    musicIndex++;
    if (musicIndex >= music_library.length) {
        musicIndex = 0;
    }
    newMusic(musicIndex);
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('.btn-play').style.display = 'block';
});

// funções

function getMusicToPlay(teste) {
    console.log(teste.path[1].id)
    music.setAttribute('src', music_library[teste.path[1].id].src);
    playMusic();
    /*
var el = document.getElementById('fora');
el.addEventListener('click', function(e) {
    alert(e.target.id);
});

    document.querySelectorAll("button").forEach(function(button) {
    
    button.addEventListener("click", function(event) {
    const el = event.target || event.srcElement;
    const id = el.id;
    console.log(id);
  });
  
});
    */
}

function newMusic(index) {
    music.setAttribute('src', music_library[index].src);
    music.addEventListener('loadeddata', () => {
        musicDuration.textContent = convertSecondsIntoMinutes(Math.floor(music.duration));
    });
}

function playMusic() {
    music.play();
    document.querySelector('.btn-pause').style.display = 'block';
    document.querySelector('.btn-play').style.display = 'none';

}

function pauseMusic() {
    music.pause();
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('.btn-play').style.display = 'block';

}

function musicProgress() {
    let progressBar = document.querySelector('progress');
    progressBar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';

    let musicTime = document.querySelector('.inicio');
    musicTime.textContent = convertSecondsIntoMinutes(Math.floor(music.currentTime));
}

function convertSecondsIntoMinutes(seconds) {
    let minutesArea = Math.floor(seconds / 60);
    let secondsArea = seconds % 60;

    if (secondsArea < 10) {
        secondsArea = '0' + secondsArea;
    }

    return minutesArea + ':' + secondsArea;
}
