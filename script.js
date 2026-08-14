// ==========================================
// PURANE NAGME MUSIC PLAYER
// ==========================================


const songs = [

    {
        title: "O Mere Dil Ke Chain",
        artist: "Kishore Kumar",
        file: "music/song1.mp3",
        image: "images/song1.jpg",
        background: "images/background1.jpg"
    },

    {
        title: "Pal Pal Dil Ke Paas",
        artist: "Kishore Kumar",
        file: "music/song2.mp3",
        image: "images/song2.jpeg",
        background: "images/background2.jpeg"
    },

    {
        title: "Neele Neele Ambar Par",
        artist: "Kishore Kumar",
        file: "music/song3.mp3",
        image: "images/song3.jpeg",
        background: "images/background3.jpeg"
    },

    {
        title: "Gulabi Aankhen",
        artist: "Mohammed Rafi",
        file: "music/song4.mp3",
        image: "images/song4.jpeg",
        background: "images/background4.jpeg"
    },

    {
        title: "Yeh Shaam Mastani",
        artist: "Kishore Kumar",
        file: "music/song5.mp3",
        image: "images/song5.jpeg",
        background: "images/background5.jpeg"
    }

];


// ==========================================
// AUDIO
// ==========================================

const audio = new Audio();

audio.volume = 0.8;

let currentSong = 0;

let isPlaying = false;


// ==========================================
// ELEMENTS
// ==========================================

const page =
    document.getElementById("page");

const songImage =
    document.getElementById("songImage");

const songTitle =
    document.getElementById("songTitle");

const artist =
    document.getElementById("artist");

const status =
    document.getElementById("status");

const playBtn =
    document.getElementById("playBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const playlist =
    document.getElementById("playlist");

const songCount =
    document.getElementById("songCount");

const reels =
    document.querySelectorAll(".reel");


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    currentSong = index;

    const song =
        songs[currentSong];


    // Audio
    audio.src = song.file;


    // Song title
    songTitle.textContent =
        song.title;


    // Artist
    artist.textContent =
        song.artist;


    // Song image
    songImage.src =
        song.image;


    // CHANGE BACKGROUND
    page.style.backgroundImage =
        `url("${song.background}")`;


    // Reset progress
    progress.value = 0;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";


    status.textContent =
        "READY • " +
        song.title.toUpperCase();


    renderPlaylist();
}


// ==========================================
// PLAY
// ==========================================

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playBtn.textContent =
                "⏸";

            status.textContent =
                "PLAYING • " +
                songs[currentSong]
                    .title
                    .toUpperCase();

            startReels();

            renderPlaylist();

        })
        .catch(error => {

            console.log(error);

            alert(
                "Audio file nahi mili. Check karo music folder."
            );

        });
}


// ==========================================
// PAUSE
// ==========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent =
        "▶";

    status.textContent =
        "PAUSED • " +
        songs[currentSong]
            .title
            .toUpperCase();

    stopReels();

    renderPlaylist();
}


// ==========================================
// PLAY / PAUSE BUTTON
// ==========================================

playBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


// ==========================================
// CHANGE SONG
// ==========================================

function changeSong(index) {

    songImage.classList.add(
        "change"
    );


    setTimeout(() => {

        loadSong(index);

        songImage.classList.remove(
            "change"
        );

        playSong();

    }, 300);
}


// ==========================================
// NEXT
// ==========================================

nextBtn.addEventListener(
    "click",
    () => {

        let next =
            currentSong + 1;


        if (
            next >=
            songs.length
        ) {

            next = 0;

        }


        changeSong(next);

    }
);


// ==========================================
// PREVIOUS
// ==========================================

prevBtn.addEventListener(
    "click",
    () => {

        let previous =
            currentSong - 1;


        if (previous < 0) {

            previous =
                songs.length - 1;

        }


        changeSong(previous);

    }
);


// ==========================================
// CASSETTE START
// ==========================================

function startReels() {

    reels.forEach(
        reel => {

            reel.classList.add(
                "spinning"
            );

        }
    );

}


// ==========================================
// CASSETTE STOP
// ==========================================

function stopReels() {

    reels.forEach(
        reel => {

            reel.classList.remove(
                "spinning"
            );

        }
    );

}


// ==========================================
// AUDIO TIME
// ==========================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration)
            return;


        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.value =
            percentage;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


// ==========================================
// AUDIO DURATION
// ==========================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


// ==========================================
// PROGRESS SEEK
// ==========================================

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration)
            return;


        audio.currentTime =
            (
                progress.value /
                100
            ) *
            audio.duration;

    }
);


// ==========================================
// VOLUME
// ==========================================

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

    }
);


// ==========================================
// AUTO NEXT
// ==========================================

audio.addEventListener(
    "ended",
    () => {

        let next =
            currentSong + 1;


        if (
            next >=
            songs.length
        ) {

            next = 0;

        }


        changeSong(next);

    }
);


// ==========================================
// TIME FORMAT
// ==========================================

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsLeft =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        (
            secondsLeft < 10
                ? "0"
                : ""
        ) +
        secondsLeft
    );
}


// ==========================================
// PLAYLIST
// ==========================================

function renderPlaylist() {

    playlist.innerHTML = "";

    songCount.textContent =
        songs.length + " Songs";


    songs.forEach(
        (song, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "playlist-item";


            if (
                index === currentSong
            ) {

                item.classList.add(
                    "active"
                );

            }


            item.innerHTML = `

                <div class="playlist-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <img
                    class="playlist-cover"
                    src="${song.image}"
                    alt="${song.title}"
                >

                <div class="playlist-info">

                    <strong>
                        ${song.title}
                    </strong>

                    <span>
                        ${song.artist}
                    </span>

                </div>

                <div class="play-icon">
                    ${
                        index === currentSong &&
                        isPlaying
                        ? "🔊"
                        : "▶"
                    }
                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    if (
                        index ===
                        currentSong
                    ) {

                        if (isPlaying) {

                            pauseSong();

                        } else {

                            playSong();

                        }

                    } else {

                        changeSong(index);

                    }

                }
            );


            playlist.appendChild(item);

        }
    );
}


// ==========================================
// INITIAL SONG
// ==========================================

loadSong(0);