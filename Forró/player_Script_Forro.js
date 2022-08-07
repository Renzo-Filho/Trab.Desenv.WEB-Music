let music_library = [
    {
        title: 'No Ouvidinho', artist: 'Felipe Amorim',
        src: 'Musics/Felipe Amorim - No Ouvidinho.mp3', id: '0'
    },

    { title: 'Cominucação FalhouS', artist: 'Mari Fernandez e Nattan', 
    src: 'Musics/Mari Fernandez - COMUNICAÇÃO FALHOU feat. Nattan (DVD Ao Vivo em Fortaleza).mp3', id: '1' },

    {
        title: 'Dengo', artist: 'João Gomes',
        src: 'Musics/João Gomes - Dengo.mp3', id: '2'
    },

    { title: 'Balanço da Rede', artist: 'Matheus Fernandes e Xand Avião ', 
    src: 'Musics/Matheus Fernandes e Xand Avião - Balanço da Rede (Clipe Oficial).mp3', id: '3' },

    { title: 'Meu Mel', artist: 'Zé Vaqueiro', 
    src: 'Musics/Meu Mel - Zé Vaqueiro (Vídeo Oficial) (128 kbps).mp3', id: '4' },

    { title: 'Coisas do Interior', artist: 'Zé Vaqueiro', 
    src: 'Musics/COISAS DO INTERIOR - ZÉ VAQUEIRO (Vídeo Oficial) (128 kbps) (1).mp3', id: '5' },

    { title: 'Áudio Que Te Entrega', artist: 'Léo Santana, MC Don Juan e Mari Fernandez', 
    src: 'Musics/Áudio Que Te Entrega - Lyric Video _ Léo Santana, MC Don Juan, Mari Fernandez (128 kbps).mp3', id: '6' },
    
    { title: 'Tem cabaré essa noite', artist: 'Nivaldo Marques e Nattan', 
    src: 'Musics/Tem cabaré essa noite - Nivaldo Marques _ Nattan (Clipe Oficial) (128 kbps).mp3', id: '7' }
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
