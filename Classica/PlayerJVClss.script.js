let music_library = [
    {
        title: 'Sinfonia do Destino', artist: 'Beethoven',
        src: 'musicClassic/Beethoven-Quinta sinfonia Sinfonia do Destino.mp3', id: '0'
    },

    {title: 'xxxxxx', artist: 'xxxxx', 
    src:'musicClassic/Carmina Burana - Carl Orff.mp3', id: '1'},


    {                   
        title: 'Entrada dos gladiadores', artist: 'Fucik',
        src: 'musicClassic/Entry Of The Gladiators - Julius Fucik.mp3', id: '2'
    },

    { title: 'O Barbeiro de Sevilha', artist: 'Gioachinoimg', src: 'musicClassic/O Barbeiro de Sevilha; Rossini.mp3', id: '3' },

    { title: 'Pequena Serenata', artist: 'Mozart', src: 'musicClassic/Mozart   Pequena Serenata Noturna.mp3', id: '4' },

    { title: 'Orpheus', artist: 'Orff', src: 'musicClassic/OFFENBACH  Orpheus in the Underworld Galop Infernal [HD].mp3', id: '5' },

    { title: 'Piano trio', artist: 'Tchaikovisky', src: 'musicClassic/Tchaikovsky Piano trio em Lá Menor.mp3', id: '6' },
    
    { title: 'Quatro estações', artist: 'Vivaldi', src: 'musicClassic/As Quatro Estações (A Primavera -  Antônio Vivaldi) A Primavera Disney Fantasia.mp3', id: '7' }
];

let musicIndex = 0;
let music = document.querySelector('audio');
let musicDuration = document.querySelector('.final');
let btnPlayMusic = document.querySelector('.playMusic');

newMusic(musicIndex);

// eventos

document.querySelectorAll('.playMusic').forEach(musica => { musica.addEventListener('click', e => { getMusicToPlay(e) }); })

document.querySelector('.btn-play').addEventListener('click', playMusic);
document.querySelector('.btn-pause').addEventListener('click', pauseMusic);
document.querySelector('.btn-volume').addEventListener('click', offVolume);
document.querySelector('.btn-volume-off').addEventListener('click', onVolume);
document.querySelector('.btn-replay').addEventListener('click', replayMusic);
music.addEventListener('timeupdate', musicProgress);

document.querySelector('.back').addEventListener('click', () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = music_library.length - 1;
    }
    newMusic(musicIndex);
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('.btn-play').style.display = 'block';
    playMusic();
});

document.querySelector('.next').addEventListener('click', () => {
    musicIndex++;
    if (musicIndex >= music_library.length) {
        musicIndex = 0;
    }
    newMusic(musicIndex);
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('.btn-play').style.display = 'block';
    playMusic();
});

// funções

function getMusicToPlay(click_event) {
    music.setAttribute('src', music_library[click_event.path[1].id].src);
    playMusic();
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

function offVolume() {
    music.volume = 0;
    document.querySelector('.btn-volume').style.display = 'none';
    document.querySelector('.btn-volume-off').style.display = 'block';
}

function onVolume() {
    music.volume = 1;
    document.querySelector('.btn-volume').style.display = 'block';
    document.querySelector('.btn-volume-off').style.display = 'none';
}

function replayMusic() {
    music.currentTime = 0;
    document.querySelector('.btn-pause').style.display = 'block';
    document.querySelector('.btn-play').style.display = 'none';
    music.play();
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
