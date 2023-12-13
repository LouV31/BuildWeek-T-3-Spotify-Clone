URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const ablums = "albums";
window.addEventListener("DOMContentLoaded", () => {
	fetchData();
});

const fetchData = () => {
	fetch(URL, {
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
		});
};
