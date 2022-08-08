let music_library = [
    {
        title: 'xxxx', artist: 'xxxxxx',
        src: 'music/Cross Road Blues - Robert Johnson (1936).mp3', id: '0'
    },

    { 
        title: 'xxxxxx', artist: 'xxxxx', 
    src:'music/Muddy Waters plays Manish Boy.mp3', id: '1' 
},

    {
        title: 'xxxxxxxxx', artist: 'xxxxxxxx',
        src: 'music/Howlin Wolf - Spoonful.mp3', id: '2'
    },

    { 
        title: 'xxxx', artist: 'xxxxxxxx',
     src: 'music/John Lee Hooker - Baby, Please Dont Go (1959).mp3', id: '3' 
    },

    { 
        title: 'xxxx', artist: 'xxxxxxxx',
     src: 'music/Sonny II - Keep It To Your Self.mp3', id: '4' 
    },

    { 
        title: 'xxxx', artist: 'xxxxxxxx',
     src: 'music/Son House - Pearline.mp3', id: '5' 
    },

    { 
        title: 'xxxx', artist: 'xxxxxxxx',
     src: 'music/Leadbelly - Where Did you Sleep Last Night.mp3', id: '6' 
    },

    { 
        title: 'xxxx', artist: 'xxxxxxxx',
     src: 'music/Robert Johnson - Me And The Devil Blues (Legendado) HD.mp3', id: '7' 
    },
]
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
    