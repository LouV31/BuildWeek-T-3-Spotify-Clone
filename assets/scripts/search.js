const URLSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

const searchSong = document.getElementById("searchSong");
const searchContent = document.getElementById("searchContent");

searchSong.addEventListener("keyup", function (e) {
	if (searchSong.value !== "") {
		const searchValue = searchSong.value;
		searchContent.innerHTML = "";
		fetchSearch(searchValue);
	}
});

function fetchSearch(searchValue) {
	console.log(searchValue);
	fetch(URLSearch + searchValue, {
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
		.then((obj) => {
			console.log(obj);
			popolaSearch(obj);
		})
		.catch((err) => {
			console.log(err);
		});
}

function popolaSearch(obj) {
	obj.data.forEach((element) => {
		const colAlbum = document.createElement("div");
		colAlbum.className = "col-6 col-md-4";
		const cardContainer = document.createElement("div");
		cardContainer.className = "card border-0 bg-dark p-3 rounded-3";
		const containerImage = document.createElement("div");
		containerImage.className = "position-relative";
		const albumImg = document.createElement("img");
		albumImg.src = element.album.cover_big;
		albumImg.className = "card-img-top rounded-2 mb-3";
		const buttonDiv = document.createElement("div");
		buttonDiv.className = "play-button";
		const playButton = document.createElement("button");
		playButton.className = "d-flex top-100 start-100 me-2 mb-4 p-3 border-0 text-black bg-success rounded-circle";
		playButton.style.cursor = "pointer";
		playButton.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="black"
        class="bi bi-play"
        viewBox="0 0 16 16"
        >
        <polygon points="0 0 16 8 0 16" />
        </svg>`;
		const albumBody = document.createElement("div");
		albumBody.className = "card-body p-0";
		const albumTitle = document.createElement("h5");
		albumTitle.className = "card-title text-white";
		albumTitle.innerText = element.title;
		const albumDesc = document.createElement("p");
		albumDesc.className = "card-text text-white-50";
		albumDesc.innerText = element.artist.name;

		containerImage.appendChild(albumImg);
		buttonDiv.appendChild(playButton);
		containerImage.appendChild(buttonDiv);
		albumBody.appendChild(albumTitle);
		albumBody.appendChild(albumDesc);
		cardContainer.appendChild(containerImage);
		cardContainer.appendChild(albumBody);
		colAlbum.appendChild(cardContainer);
		searchContent.appendChild(colAlbum);

		colAlbum.addEventListener("mouseover", function () {
			buttonDiv.classList.add("opacity-100");
			cardContainer.classList.add("bg-secondary");
			cardContainer.classList.remove("bg-dark");
		});
		colAlbum.addEventListener("mouseout", function () {
			buttonDiv.classList.remove("opacity-100");
			cardContainer.classList.remove("bg-secondary");
			cardContainer.classList.add("bg-dark");
		});
	});
}
