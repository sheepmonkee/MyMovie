let watchlist =
JSON.parse(
    localStorage.getItem("watchlist")
) || [];

const container =
document.getElementById(
    "watchlistContainer"
);

displayMovies();

function displayMovies(){

    container.innerHTML = "";

    let totalMinutes = 0;

    watchlist.forEach((movie,index)=>{

        totalMinutes += parseInt(movie.runtime);

        container.innerHTML += `

        <div class="movie-card">

            <img src="${movie.poster}" width="200">

            <h2>${movie.title}</h2>

            <p>${movie.genre}</p>

            <p>${movie.runtime}</p>

            <p>
                ⭐ IMDb Rating:
                ${movie.rating}
            </p>

            <p>
                Note:
                ${movie.note || "No note added"}
            </p>

            <input
                type="text"
                id="note-${index}"
                placeholder="Enter note"
            >

            <button
                class="save-note-btn"
                data-index="${index}"
            >
                Save Note
            </button>

            <button
                class="delete-btn"
                data-index="${index}"
            >
                Delete
            </button>

        </div>

        `;

    });

    document.getElementById(
        "totalWatchTime"
    ).innerHTML = `

        Total Movies:
        ${watchlist.length}

        <br><br>

        Total Watch Time:
        ${totalMinutes} Minutes

        <br><br>

        Total Hours:
        ${(totalMinutes / 60).toFixed(1)} Hours

    `;

    document.querySelectorAll(".save-note-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const index =
            button.dataset.index;

            const note =
            document.getElementById(
                `note-${index}`
            ).value;

            watchlist[index].note = note;

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

            alert("Note saved!");

            displayMovies();

        });

    });

    document.querySelectorAll(".delete-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const index =
            button.dataset.index;

            const confirmDelete =
            confirm("Delete this movie?");

            if(!confirmDelete){
                return;
            }

            watchlist.splice(index,1);

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

            displayMovies();

        });

    });

}