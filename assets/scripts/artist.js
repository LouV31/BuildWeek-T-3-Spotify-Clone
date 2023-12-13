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
            generateArtistPage(myObj);
        })
        .catch((err) => {
            console.log("error", err);
        });
});

function generateArtistPage(myObj) {
    const imgArtistDiv = document.getElementById("imgArtist");
    imgArtistDiv.style.backgroundImage = myObj.picture_xl;
    const artistName = document.getElementById("artistName");
    artistName.innerText = myObj.name;
    const monthlyFans = document.getElementById("monthlyFans");
    monthlyFans.innerText = myObj.nb_fan + " ascoltatori mensili";
}
