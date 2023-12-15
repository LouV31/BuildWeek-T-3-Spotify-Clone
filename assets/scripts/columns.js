const btnAmici = document.getElementById("btnAmici");
const friends = document.getElementById("friends");
const closeFriends = function () {
	friends.classList.toggle("d-lg-block");
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

const artistParam = "nome&type=artist";

const randomIndex = Math.floor(Math.random() * 200);
const playlistParam = "type:playlist/&limit=100&index=" + randomIndex;
const albumParam = 'type:"album"';
const fetcher = (url) => {
	fetch(url, {
		headers: {
			"X-RapidAPI-Key": token,
			"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
		},
	})
		.then((response) => {
			//console.log(response);

			if (!response.ok) throw new Error("Errore");
			return response.json();
		})
		.then((playlists) => {
			//console.log(playlists);
			shuffleArray(playlists.data);
			const playlistContainer = document.getElementById("playlistContainer");
			playlists.data.forEach((playlist) => {
				const divPlaylistColumn = document.createElement("divPlaylistColumn");
				divPlaylistColumn.addEventListener("mouseover", function () {
					divPlaylistColumn.classList.add("bg-secondary");
				});
				divPlaylistColumn.addEventListener("mouseout", function () {
					divPlaylistColumn.classList.remove("bg-secondary");
				});
				divPlaylistColumn.classList.add(
					"p-2",
					"d-flex",
					"align-items-center",
					"rounded-2",
					"mb-2",
					"overflow-x-hidden"
				);
				const img = document.createElement("img");
				img.className = "me-2 rounded-2";
				img.src = playlist.album.cover_small;
				const pPlaylistTitle = document.createElement("pPlaylistTitle");
				pPlaylistTitle.className = "m-0 small ellipsis overflow-x-hidden";
				pPlaylistTitle.innerText = playlist.title;
				pPlaylistAuthor = document.createElement("p");
				pPlaylistAuthor.innerText = playlist.album.title;
				pPlaylistAuthor.className = "text-muted m-0 ellipsis overflow-x-hidden";
				divPlaylistInfo = document.createElement("div");
				divPlaylistInfo.className = "d-flex flex-column justify-content-between overflow-x-hidden";
				divPlaylistInfo.appendChild(pPlaylistTitle);
				divPlaylistInfo.appendChild(pPlaylistAuthor);
				playlistContainer.appendChild(divPlaylistColumn);
				divPlaylistColumn.appendChild(img);
				divPlaylistColumn.appendChild(divPlaylistInfo);
			});
		})
		.catch((error) => new Error(error));
};

//fetcher(url + playlistParam);
fetcher(url + playlistParam);

const prevButton = document.querySelector(".bi-caret-left");
const nextButton = document.querySelector(".bi-caret-right");
nextButton.addEventListener("click", function () {
	history.forward();
});
prevButton.addEventListener("click", function () {
	history.back();
});
