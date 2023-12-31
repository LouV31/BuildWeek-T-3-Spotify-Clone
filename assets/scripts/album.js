const urlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const urlSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId");
console.log(albumId);

const colorArray = ["palegreen", "palegoldenrod", "paleturquoise", "lightgrey"];
shuffleArray(colorArray);
const bgColor = colorArray[0];
console.log(bgColor);

window.addEventListener("DOMContentLoaded", () => {
    fetch(urlAlbum + albumId, {
        headers: {
            "X-RapidAPI-Key": token,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                statusErrors(resp);
            }
            return resp.json();
        })
        .then((myObj) => {
            console.log(myObj);
            generateAlbumPage(myObj);
            generateAlbumSongs(myObj);
        })
        .catch((err) => {
            console.log("error", err);
        });
});

function generateAlbumPage(myObj) {
    const albumCover = document.getElementById("albumCover");
    albumCover.src = myObj.cover_medium;
    const nameAlbum = document.getElementById("nameAlbum");
    nameAlbum.innerText = myObj.title;
    const albumArtistImg = document.getElementById("albumArtistImg");
    albumArtistImg.src = myObj.artist.picture_small;
    const albumArtistName = document.getElementById("albumArtistName");
    albumArtistName.innerHTML = myObj.artist.name;
    albumArtistName.href = "./artist.html?artistId=" + myObj.artist.id;
    const albumInfo = document.getElementById("albumInfo");
    albumInfo.innerHTML = `${myObj.release_date.split("-")[0]}  &#183;  ${myObj.nb_tracks} brani &#183; ${Math.round(
        myObj.duration / 60
    )} min`;
    const bgAlbum = document.getElementById("imgArtist");
    bgAlbum.style.backgroundColor = bgColor;
    bgAlbum.style.boxShadow = "10px 0 200px " + bgColor;
}

function generateAlbumSongs(myObj) {
    const olAlbumSongs = document.getElementById("albumSongs");
    let i = 1;
    myObj.tracks.data.forEach((track) => {
        const liSong = document.createElement("li");
        liSong.className = "d-flex pe-4 list-group-item bg-transparent text-white-50 mb-3 ms-4 ps-1 rounded-2";
        const titleSongDiv = document.createElement("div");
        titleSongDiv.className = "d-flex w-50";
        const indexSong = document.createElement("span");
        indexSong.className = "text-white-50 text-end ms-0 me-2";
        indexSong.style.width = "24px";
        indexSong.innerText = i;
        i++;
        const songTitle = document.createElement("p");
        songTitle.className = "m-0 ms-2 text-white";
        songTitle.innerText = track.title;
        titleSongDiv.appendChild(indexSong);
        titleSongDiv.appendChild(songTitle);
        liSong.appendChild(titleSongDiv);
        const divPlays = document.createElement("div");
        divPlays.className = "d-none d-md-block w-25 pe-0 pe-xl-5";
        const plays = document.createElement("p");
        plays.className = "m-0 text-end me-0 me-xl-5";
        plays.innerText = track.rank;
        divPlays.appendChild(plays);
        liSong.appendChild(divPlays);
        const divTime = document.createElement("div");
        divTime.className = "flex-grow-1 d-flex justify-content-end align-items-center";
        const heartSvg = document.createElement("p");
        heartSvg.className = "fs-4 m-0 me-4 d-flex align-items-center";
        heartSvg.innerHTML = `<svg
		xmlns="http://www.w3.org/2000/svg"
		width="22"
		height="22"
		fill="currentColor"
		class="bi bi-heart opacity-0 hoverOn"
		viewBox="0 0 16 16"
		>
		<path
			d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
		/>
		</svg>`;
        const songTime = document.createElement("p");
        songTime.className = "m-0 mx-2";
        let minutes = Math.floor(track.duration / 60);
        let seconds = track.duration % 60;
        let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        console.log(formattedDuration);
        songTime.innerText = formattedDuration;
        const other = document.createElement("p");
        other.className = "fs-4 m-0 d-flex align-items-center";
        other.innerHTML = `<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		class="bi bi-three-dots opacity-0 hoverOn"
		viewBox="0 0 16 16"
		>
		<path
			d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
		/>
		</svg>`;
        divTime.appendChild(heartSvg);
        divTime.appendChild(songTime);
        divTime.appendChild(other);
        liSong.appendChild(divTime);
        olAlbumSongs.appendChild(liSong);
        let change = 0;
        liSong.addEventListener("mouseover", function () {
            change = indexSong.innerHTML;
            indexSong.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
			<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
		  </svg>`;

            liSong.querySelectorAll("svg").forEach((el) => {
                el.classList.add("opacity-100");
            });

            liSong.classList.remove("bg-transparent");
            liSong.classList.add("bg-secondary");
        });
        liSong.addEventListener("mouseout", function () {
            indexSong.innerHTML = change;
            liSong.querySelectorAll("svg").forEach((el) => {
                if (!el.classList.contains("text-success")) {
                    el.classList.remove("opacity-100");
                    el.classList.add("opacity-0");
                }
            });

            liSong.classList.add("bg-transparent");
            liSong.classList.remove("bg-secondary");
        });
        const heart = heartSvg.querySelector(".bi-heart");

        heart.addEventListener("click", () => {
            objToPush = {
                id: track.id,
                title: track.title,
                preview: track.preview,
            };
            const index = likedSongArr.findIndex(
                (item) =>
                    item.id === objToPush.id && item.title === objToPush.title && item.preview === objToPush.preview
            );
            if (index === -1) {
                likedSongArr.push(objToPush);
                heart.classList.add("text-success");
                heart.classList.add("opacity-100");
            } else {
                likedSongArr.splice(index, 1);
                heart.classList.remove("text-success");
                heart.classList.remove("opacity-100");
            }
            /* let i = likedSongArr.indexOf(track); */
            /* likedSongArr.push(objToPush);
             */

            /* if (likedSongArr.includes(track.id)) {
                likedSongArr.splice(i, track.id);
            } */
            console.log(likedSongArr);

            console.log(track.id);
        });

        /* music player function */
        liSong.addEventListener("click", function (e) {
            /* immagine */
            const playerImg = document.querySelector(".musicPlayer img");
            const smallPlayerImg = document.getElementById("smallPlayerImg");

            playerImg.src = myObj.cover_medium;
            smallPlayerImg.src = myObj.cover_medium;

            /* titolo */
            const titolPlayer = document.querySelector(".musicPlayer h5");
            const smallPlayerTitle = document.getElementById("smallPlayerTitle");
            smallPlayerTitle.innerText = track.title;
            titolPlayer.innerText = track.title;
            const artistPlayer = document.querySelector(".musicPlayer p");
            const smallPlayerName = document.getElementById("smallPlayerName");
            artistPlayer.innerText = myObj.artist.name;
            smallPlayerName.innerText = myObj.artist.name;

            /* link preview */
            let songFile = track.preview;
            const audioTag = document.querySelector("audio");
            audioTag.pause();
            audioTag.src = songFile;
            const playButton = document.querySelector(".play");
            const smallPlayerPlay = document.getElementById("smallPlayerPlay");

            smallPlayerPlay.addEventListener("click", function () {
                if (audioTag.paused) {
                    audioTag.play();
                } else {
                    audioTag.pause();
                }
            });

            let playIcon = playButton.innerHTML;
            playButton.addEventListener("click", function () {
                if (audioTag.paused) {
                    playIcon = playButton.innerHTML;
                    playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
			<path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
		  </svg>`;
                    audioTag.play();
                } else {
                    playButton.innerHTML = playIcon;
                    audioTag.pause();
                }
            });
            /* audio */
            var volumeControl = document.getElementById("volumeControl");
            volumeControl.addEventListener("input", function () {
                audioTag.volume = this.value / 100;
            });
        });
    });
}
