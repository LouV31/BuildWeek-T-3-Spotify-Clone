const urlArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const urlSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");
console.log(artistId);

window.addEventListener("DOMContentLoaded", () => {
	fetch(urlArtist + artistId, {
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
			generateArtistPage(myObj);
		})
		.catch((err) => {
			console.log("error", err);
		});
});

function generateArtistPage(myObj) {
	const imgArtistDiv = document.getElementById("imgArtist");
	imgArtistDiv.style.backgroundImage = `url('${myObj.picture_xl}')`;
	const artistName = document.getElementById("artistName");
	artistName.innerText = myObj.name;
	const monthlyFans = document.getElementById("monthlyFans");
	monthlyFans.innerText = myObj.nb_fan + " ascoltatori mensili";
	const artistLikedImg = document.getElementById("artistLikedImg");
	artistLikedImg.src = myObj.picture_medium;
	const artistLikedName = document.getElementById("artistLikedName");
	artistLikedName.innerText = "di " + myObj.name;

	const urlSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + myObj.name;
	/* fetch 2 */
	fetch(urlSearch, {
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
			for (let i = 0; i < 5; i++) {
				console.log(myObj);
				console.log(urlSearch);
				generateArtistSongs(myObj.data[i]);
			}
		})
		.catch((err) => {
			console.log("error", err);
		});
}

function generateArtistSongs(myObj) {
	const artistSong = document.getElementById("artistSong");

	const singleSong = document.createElement("li");
	singleSong.className =
		"d-flex align-items-center justify-content-between rounded-2 list-group-item bg-transparent border-0 text-white";
	const songImg = document.createElement("img");
	songImg.src = myObj.album.cover_small;
	songImg.className = "rounded-3 ms-4";
	const songInfo = document.createElement("div");
	songInfo.classList = "text-white ms-3 w-50 me-auto";
	const songName = document.createElement("p");
	songName.classList = "m-0";
	songName.innerText = myObj.title;
	songInfo.appendChild(songName);
	if (myObj.explicit_lyrics == true) {
		const songE = document.createElement("p");
		songE.classList = "m-0";
		songE.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-explicit-fill" viewBox="0 0 16 16">
	<path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zm4.326 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
  </svg>`;
		songInfo.appendChild(songE);
	}
	artistSong.appendChild(singleSong);
	singleSong.appendChild(songImg);
	singleSong.appendChild(songInfo);

	const nStream = document.createElement("div");
	nStream.className = "d-flex justify-content-end me-5 w-25";
	nStream.innerHTML = `<p class="m-0">${myObj.rank}</p>`;
	singleSong.appendChild(nStream);

	const divDuration = document.createElement("div");
	let minutes = Math.floor(myObj.duration / 60);
	let seconds = myObj.duration % 60;
	let formattedDuration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	console.log(formattedDuration);
	divDuration.className = "d-flex justify-content-end";
	divDuration.innerHTML = `<p class="m-0"><svg
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
	</svg></p>
	<p class="m-0 mx-3">${formattedDuration}</p>
	<p class="m-0"><svg
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
	</svg></p>`;
	singleSong.appendChild(divDuration);

	singleSong.addEventListener("mouseover", function () {
		singleSong.classList.remove("bg-transparent");
		singleSong.classList.add("bg-secondary");
		this.querySelectorAll("svg").forEach((el) => {
			el.classList.add("opacity-100");
		});
	});
	singleSong.addEventListener("mouseout", function () {
		singleSong.classList.remove("bg-secondary");
		singleSong.classList.add("bg-transparent");
		this.querySelectorAll("svg").forEach((el) => {
			el.classList.remove("opacity-100");
		});
	});
	/* music player function */
	singleSong.addEventListener("click", function (e) {
		/* immagine */
		const playerImg = document.querySelector(".musicPlayer img");
		const songImage = singleSong.querySelector("img");
		playerImg.src = songImage.src;

		/* titolo */
		const titolPlayer = document.querySelector(".musicPlayer h5");
		titolPlayer.innerText = myObj.title;
		const artistPlayer = document.querySelector(".musicPlayer p");
		artistPlayer.innerText = myObj.artist.name;

		/* link preview */
		let songFile = myObj.preview;
		const audioTag = document.querySelector("audio");
		audioTag.src = songFile;
		const playButton = document.querySelector(".play");

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
}
