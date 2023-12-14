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
    myObj.tracks.data.forEach((track) => {
        const liSong = document.createElement("li");
        liSong.className = "d-flex ps-5 pe-4 list-group-item bg-transparent text-white-50";
        const titleSongDiv = document.createElement("div");
        titleSongDiv.className = "d-flex w-50";
        const songTitle = document.createElement("p");
        songTitle.className = "m-0 ms-2 text-white";
        songTitle.innerText = track.title;
        titleSongDiv.appendChild(songTitle);
        liSong.appendChild(titleSongDiv);
        const divPlays = document.createElement("div");
        divPlays.className = "w-25 pe-5";
        const plays = document.createElement("p");
        plays.className = "m-0 text-end me-5";
        plays.innerText = track.rank;
        divPlays.appendChild(plays);
        liSong.appendChild(divPlays);
        const divTime = document.createElement("div");
        divTime.className = "flex-grow-1 d-flex justify-content-end";
        const heartSvg = document.createElement("p");
        heartSvg.className = "opacity-0 fs-4 m-0";
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
        let minutes = Math.floor(track.duration / 60);
        let seconds = track.duration % 60;
        let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        console.log(formattedDuration);
        songTime.innerText = formattedDuration;
        const other = document.createElement("p");
        other.className = "opacity-0 fs-4 m-0";
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
    });
}
