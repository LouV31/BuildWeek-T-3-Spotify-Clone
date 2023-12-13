const urlArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
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
        });
});
