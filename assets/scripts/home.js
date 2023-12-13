const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const artistArr = [13, 45, 29, 19, 39, 84];

const generateGreet = () => {
	artistArr.forEach((artist) => {
		fetch(URL + artist, {
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
	}
};
generateGreet();
