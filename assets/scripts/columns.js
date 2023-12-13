const btnAmici = document.getElementById("btnAmici");
const friends = document.getElementById("friends");
const closeFriends = function () {
	friends.classList.toggle("d-none");
};
const btnCloseFriends = document.getElementById("btnCloseFriends");
btnCloseFriends.addEventListener("click", closeFriends);
btnAmici.addEventListener("click", closeFriends);

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=playlist/tracks";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "3f1a5574c1msha483a051a04a59fp184613jsn9af0f57c763b",
		"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
	},
};

const fetcher = () => {
	fetch(url, {
		headers: {
			method: "GET",
			"X-RapidAPI-Key": token,
			"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
		},
	})
		.then((response) => {
			console.log(response);

			if (!response.ok) throw new Error("Errore");
			return response.json();
		})
		.then((playlist) => {
			console.log(playlist);
		})
		.catch((error) => new Error(error));
};

fetcher();
