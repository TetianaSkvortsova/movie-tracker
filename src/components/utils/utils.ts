import type { Movie, MoviesState} from "../../store/moviesSlice.ts";
import type { Genre} from "../../store/genresSlice.ts";

export type SortBy = 'voteAverage' | 'releaseDate' | 'title';
export type FilterAndSortOptions = Pick<MoviesState, 'sortBy' | 'selectedGenres' | 'minRating'>;

export function applyFiltersAndSorting(movies: Movie[], {sortBy, minRating, selectedGenres}: FilterAndSortOptions) {
    if (!movies) {
        return [];
    }

    const filtered = movies.filter((movie) => {
        const matchesGenres = selectedGenres.length > 0
            ? selectedGenres.some((genre) => movie.genre?.id === Number(genre))
            : true;
        const matchesRating = movie.voteAverage >= minRating;
        return matchesGenres && matchesRating;
    });

    return filtered.sort((a, b) => {
        if (sortBy === 'voteAverage') {
            return b.voteAverage - a.voteAverage;
        }
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        if (sortBy === 'releaseDate') {
            return Number(b.releaseDate) - Number(a.releaseDate);
        }
        return 0;
    });
}

export function mapMovieToStore (response: Record<string, any>, genres: Genre[]) {
    console.log('response: ', response, 'genres: ', genres);
    return response.map((movie: Record<string, any>) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date ? movie.release_date.slice(0, 4) : '',
        voteAverage: Number(movie.vote_average.toFixed(1)),
        genre: genres.find((genre) => {
            return genre.id === movie.genre_ids[0];
        })
    }));
}
/*
return response.data.results.map((movie: Record<string, any>) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date ? movie.release_date.slice(0, 4) : '',
    voteAverage: Number(movie.vote_average.toFixed(1)),
    genre: genresList.find((genre) => {
        return genre.id === movie.genre_ids[0];
    })
}));*/
