const URLSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem/&limit=50"


const fetchData = () => {
    fetch(URLSearch, {
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
        })
        .catch((err) => {
            console.log(err);
        });
};
fetchData();