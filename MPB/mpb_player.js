let music_library = [
    {
        title: 'All Star', artist: 'Nando Reis', src: 'Musics/Nando Reis - All Star (Clipe Oficial).mp3', id: '0'
    },

    { title: 'Admirável Mundo Novo', artist: 'Zé Ramalho', 
    src: 'Musics/Zé_Ramalho_Admirável_Gado_Novo.mp3', id: '1' },

    {
        title: 'Se...', artist: 'Djavan', src: 'Musics/Djavan_Se_Ao_Vivo.mp3', id: '2'
    },

    { title: 'Não Quero Dinheiro (Só Quero Amar)', artist: 'Tim Maia', src: 'Musics/Tim Maia - Não Quero Dinheiro (Só Quero Amar).mp3', id: '3' },

    { title: 'Malandragem', artist: 'Cássia Eller', src: 'Musics/Cássia Eller - Malandragem (Ao Vivo).mp3', id: '4' },

    { title: 'Lágrimas E Chuva', artist: 'Kid Abelha', src: 'Musics/Kid Abelha - Lágrimas E Chuva (Ao Vivo).mp3', id: '5' },

    { title: 'Anunciação', artist: 'Alceu Valença', src: 'Musics/Alceu Valenca - Anunciação.mp3', id: '6' },
    
    { title: 'Apenas Um Rapaz Latino Americano', artist: 'Belchior', src: 'Musics/Belchior - Apenas Um Rapaz Latino Americano.mp3', id: '7' }
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
