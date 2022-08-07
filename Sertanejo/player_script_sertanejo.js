let music_library = [
    {
        title: 'Facas', artist: 'Diego & Victor Hugo e Bruno & Marrone',
        src: 'Musics/facas.mp3', id: '0'
    },

    { title: 'Molhando o Volante', artist: 'Jorge & Mateus', src: 'Musics/Jorge & Mateus - Molhando o Volante.mp3', id: '1' },

    {
        title: 'Seu Perfil', artist: 'Henrique & Juliano',
        src: 'Musics/Henrique e Juliano -  SEU PERFIL - DVD Manifesto Musical.mp3', id: '2'
    },

    { title: 'Termina Comigo Antes', artist: 'Gustavo Lima', src: 'Musics/Gusttavo Lima - Termina Comigo Antes  (Ao Vivo em Porto Alegre).mp3', id: '3' },

    { title: 'Foi Você Quem Trouxe', artist: 'Luana Prado', src: 'Musics/Lauana Prado - Foi Você Quem Trouxe (Ao Vivo).mp3', id: '4' },

    { title: 'Expectativa vc Realidade', artist: 'Matheus & Kauan', src: 'Musics/Matheus & Kauan - Expectativa x Realidade.mp3', id: '5' },

    { title: 'Bem pior que eu', artist: 'Marília Mendonça', src: 'Musics/Marília Mendonça - BEM PIOR QUE EU.mp3', id: '6' },
    
    { title: 'Clone', artist: 'Júlio & Cézar', src: 'Musics/Júnior e Cézar - CLONE - EP Provou, Gostou.mp3', id: '7' }
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
