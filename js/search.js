const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchMovie);

async function searchMovie() {

    const movieName =
    document.getElementById("movieInput").value;

    if (movieName === "") {
        alert("Please enter a movie name");
        return;
    }

    const apiKey = "a7a3f664";

    const url =
    `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (data.Response === "False") {

            document.getElementById("result").innerHTML =
            `<h2>${data.Error}</h2>`;

            return;
        }

        const suggestion =
        getSuggestion(data.Genre);

        document.getElementById("result").innerHTML = `

        <div class="movie-card">

            <img
                src="${data.Poster}"
                width="250"
            >

            <h2>${data.Title}</h2>

            <p>Year: ${data.Year}</p>

            <p>Genre: ${data.Genre}</p>

            <p>Runtime: ${data.Runtime}</p>

            <p>IMDb Rating: ${data.imdbRating}</p>

            <p style="color:gold;">
                ${suggestion}
            </p>

            <button id="saveBtn">
                Add To Watchlist
            </button>

        </div>

        `;

        document
        .getElementById("saveBtn")
        .addEventListener("click", () => {

            saveMovie(data);

        });

    }
    catch (error) {

        alert("Movie could not be loaded");
        console.error(error);

    }
}

function getSuggestion(genre) {

    if (genre.includes("Action")) {
        return " Recommended for action lovers!";
    }

    else if (genre.includes("Comedy")) {
        return " Perfect for a relaxing movie night!";
    }

    else if (genre.includes("Horror")) {
        return " Great choice for suspense fans!";
    }

    else if (genre.includes("Drama")) {
        return " Recommended for story-driven viewers!";
    }

    else {
        return "🎬 Explore this movie and discover something new!";
    }
}

function saveMovie(movie) {

    let watchlist =
    JSON.parse(
        localStorage.getItem("watchlist")
    ) || [];

    const movieExists =
    watchlist.some(item =>
        item.title === movie.Title
    );

    if (movieExists) {
        alert("Movie already exists in watchlist!");
        return;
    }

    watchlist.push({

        title: movie.Title,
        year: movie.Year,
        genre: movie.Genre,
        runtime: movie.Runtime,
        poster: movie.Poster,
        rating: movie.imdbRating

    });

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    alert("Movie added to watchlist!");

    console.log(watchlist);
}