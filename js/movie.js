class Movie {
    constructor(title, genre, runtime, rating) {
        this.title = title;
        this.genre = genre;
        this.runtime = runtime;
        this.rating = rating;
    }

    getMovieInfo() {
        return `${this.title} - ${this.genre}`;
    }
}