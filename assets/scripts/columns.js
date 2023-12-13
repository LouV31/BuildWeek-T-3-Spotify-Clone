const btnAmici = document.getElementById("btnAmici");
const friends = document.getElementById("friends");
const closeFriends = function () {
	friends.classList.toggle("d-none");
};
const btnCloseFriends = document.getElementById("btnCloseFriends");
btnCloseFriends.addEventListener("click", closeFriends);
btnAmici.addEventListener("click", closeFriends);

function shuffleArray(inputArray) {
	inputArray.sort(() => Math.random() - 0.5);
}

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "3f1a5574c1msha483a051a04a59fp184613jsn9af0f57c763b",
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
	},
};

const playlistParam = "type:playlist/";
const albumParam = 'type:"album"';
const fetcher = () => {
	fetch(url, {
		headers: {
			"X-RapidAPI-Key": token,
			"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
		},
	})
		.then((response) => {
			console.log(response);

			if (!response.ok) throw new Error("Errore");
			return response.json();
		})
		.then((playlists) => {
			console.log(playlists);
			/* shuffleArray(playlists.data);
			const playlistConteiner = document.getElementById("playlistContainer");
			playlists.data.forEach((playlist) => {
				const div = document.createElement("div");
				div.classList.add("p-2", "d-flex");
				const img = document.createElement("img");
				img.src = playlist.album.cover_small;
				const p = document.createElement("p");
				p.innerText = playlist.title;
				playlistConteiner.appendChild(div);
				div.appendChild(img);
				div.appendChild(p);
				if (playlist.next) {
					fetcher(playlist.next);
				}
			} )*/
		})
		.catch((error) => new Error(error));
};

//fetcher(url + playlistParam);
fetcher();
