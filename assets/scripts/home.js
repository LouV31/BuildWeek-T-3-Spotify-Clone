const urlArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const urlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const urlPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/";

const artistArr = [13, 45, 29, 19, 39, 84];
const albumsArr = [103248, 12813058, 14101380, 531851, 74479];
const playlistArr = [
    160504851, 49119317, 6313525084, 31693005, 5317014122, 12146394, 4525618, 3005155, 114461181, 133196991,
];

const idAdsArr = [89748835, 565278172, 23457141];

const fetchAlbums = () => {
    shuffleArray(albumsArr);
    albumsArr.forEach((album) => {
        fetch(urlAlbum + album, {
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
                generateAlbums(myObj);
            });
    });
    function generateAlbums(obj) {
        const albumsRow = document.getElementById("albumsRow");
        const colAlbum = document.createElement("div");
        colAlbum.className = "col";
        const cardContainer = document.createElement("div");
        cardContainer.className = "card bg-dark p-3 rounded-1";
        const containerImage = document.createElement("div");
        containerImage.className = "position-relative";
        const albumImg = document.createElement("img");
        albumImg.src = obj.cover_medium;
        albumImg.className = "card-img-top rounded-1 mb-3";
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
        albumTitle.innerText = obj.title;
        const albumDesc = document.createElement("p");
        albumDesc.className = "card-text text-white-50";
        albumDesc.innerText = obj.artist.name;

        containerImage.appendChild(albumImg);
        buttonDiv.appendChild(playButton);
        containerImage.appendChild(buttonDiv);
        albumBody.appendChild(albumTitle);
        albumBody.appendChild(albumDesc);
        cardContainer.appendChild(containerImage);
        cardContainer.appendChild(albumBody);
        colAlbum.appendChild(cardContainer);
        albumsRow.appendChild(colAlbum);

        colAlbum.addEventListener("mouseover", function () {
            buttonDiv.classList.add("opacity-100");
        });
        colAlbum.addEventListener("mouseout", function () {
            buttonDiv.classList.remove("opacity-100");
        });
        colAlbum.addEventListener("click", function () {
            window.location.assign("./album.html?albumId=" + obj.id);
        });
    }
};
fetchAlbums();

const fetchArtists = () => {
    shuffleArray(artistArr);
    artistArr.forEach((artist) => {
        fetch(urlArtist + artist, {
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
                generateArtist(myObj);
            });
    });

    function generateArtist(myObj) {
        const rowArtists = document.getElementById("rowArtists");
        const artist = document.createElement("div");
        artist.className = "col-4";
        artist.style.cursor = "pointer";
        const artistContent = document.createElement("div");
        artistContent.className = "d-flex bg-secondary align-items-center text-white rounded-1 overflow-hidden";
        const img = document.createElement("img");
        img.className = "me-2";
        img.style.height = "70px";
        img.style.objectFit = "cover";
        img.src = myObj.picture_small;
        const artistName = document.createElement("p");
        artistName.className = "m-0";
        artistName.innerText = myObj.name;
        artistContent.appendChild(img);
        artistContent.appendChild(artistName);
        artist.appendChild(artistContent);
        rowArtists.appendChild(artist);
        artist.addEventListener("click", function () {
            window.location.assign("./artist.html?artistId=" + myObj.id);
        });
    }
};
fetchArtists();

const fetchPlaylists = () => {
    shuffleArray(playlistArr);
    playlistArr.forEach((playlist) => {
        fetch(urlPlaylist + playlist, {
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
                generatePlaylist(myObj);
            });
    });
};
fetchPlaylists();
function generatePlaylist(obj) {
    const albumsRow = document.getElementById("playlistRow");
    const colAlbum = document.createElement("div");
    colAlbum.className = "col";
    const cardContainer = document.createElement("div");
    cardContainer.className = "card bg-dark p-3 rounded-1";
    const containerImage = document.createElement("div");
    containerImage.className = "position-relative";
    const albumImg = document.createElement("img");
    albumImg.src = obj.picture_small;
    albumImg.className = "card-img-top rounded-1 mb-3";
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
    albumTitle.innerText = obj.title;
    const albumDesc = document.createElement("p");
    albumDesc.className = "card-text text-white-50";
    albumDesc.innerText = obj.creator.name;

    containerImage.appendChild(albumImg);
    buttonDiv.appendChild(playButton);
    containerImage.appendChild(buttonDiv);
    albumBody.appendChild(albumTitle);
    albumBody.appendChild(albumDesc);
    cardContainer.appendChild(containerImage);
    cardContainer.appendChild(albumBody);
    colAlbum.appendChild(cardContainer);
    albumsRow.appendChild(colAlbum);

    colAlbum.addEventListener("mouseover", function () {
        buttonDiv.classList.add("opacity-100");
    });
    colAlbum.addEventListener("mouseout", function () {
        buttonDiv.classList.remove("opacity-100");
    });
    cardContainer.addEventListener("click", function () {
        window.location.assign("./playlist.html?playlistId=" + obj.id);
    });
}

const fetchAds = function () {
    shuffleArray(idAdsArr);
    fetch(urlPlaylist + idAdsArr[0], {
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
            generateAds(myObj);
        });
};
//fetchAds();

function generateAds(obj) {
    const imgAds = document.getElementById("imgAds");
    imgAds.src = obj.album.cover_big;
    const albumAds = document.getElementById("albumAds");
    albumAds.innerText = obj.album.title;
    const titleAds = document.getElementById("titleAds");
    titleAds.innerText = obj.title;
    const artistAds = document.getElementById("artistAds");
    artistAds.innerText = obj.artist.name;
}
