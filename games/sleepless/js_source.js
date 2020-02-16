//上线时，使用 https://www.sojson.com/javascriptobfuscator.html 对JS进行加密
// const host = "http://media.xxoojoke.com/";
const rain = document.getElementById('player_rain');
const music = document.getElementById('player_music');
const playBtn = document.getElementById('btnPlay');
let platFirst = true;
let currentMusicId = '17746129';

function playAudio(musicId) {
    var domain = document.domain;
    // if (domain !== 'rain.xxoojoke.com' && domain !== '127.0.0.1' && domain !== 'www.tingyu.pro' && domain !== 'tingyu.pro') {
    //     alert("Load Error: please contact freetyc@foxmail.com");
    //     return;
    // }

    if (musicId == null || musicId === '') {
        musicId = currentMusicId;
    }
    let changeMusic = currentMusicId !== musicId;
    currentMusicId = musicId;

    if (changeMusic) {
        setup_rain();
        rain.play();

        setupmusic(musicId);
        music.play();
        playBtn.className = "";
        playBtn.className = "pause";
    } else if (rain.paused) {
        if (platFirst) {
            setup_rain();
            setupmusic(musicId);
        } else {
            setVolume(1);
            setVolume(2);
        }
        rain.play();
        music.play();
        playBtn.className = "";
        playBtn.className = "pause";
    } else {
        stopAudio(rain);
        stopAudio(music);
        playBtn.className = "";
        playBtn.className = "play";
    }
    platFirst = false;
}

function setup_rain() {
    const sourceRain = document.getElementById("player_rain_source");
    sourceRain.src = 'http://music.163.com/song/media/outer/url?id=' + musicId + '.mp3';
    setVolume(1);
    rain.load();
}

function setupmusic(musicId) {
    const sourceMusic = document.getElementById("player_music_source");
    setVolume(2);
    sourceMusic.src = 'http://music.163.com/song/media/outer/url?id=' + musicId + '.mp3';
    music.load();
}

function setVolume(target) {
    if (target === 1) {
        const volumnRain = document.getElementById("volumn_rain");
        rain.volume = volumnRain.value;
    } else {
        const volumnMusic = document.getElementById("volumn_music");
        music.volume = volumnMusic.value;
    }
}

function stopAudio(widget) {
    let v = widget.volume;
    const t = setInterval(function () {
        v -= 0.1;
        if (v > 0) {
            widget.volume = v;
        } else {
            clearInterval(t);
            widget.pause();
        }
    }, 100);
}

function change_music(music_id) {
    playAudio(music_id);
}