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

function generateArtistSongs(myObj) {}
