import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tmdbApi} from "../api/tmbd.ts";

type SortOption = 'voteAverage' | 'title' | 'releaseDate';

export interface Movie {
    id: number;
    title: string;
    posterPath : string;
    releaseDate: string;
    voteAverage: number;
    genres: string[];
}

interface MoviesState {
    movies: Movie[];
    allMovies: Movie[];
    genres: string[];
    loading: boolean;
    error: string | null;
    sortBy: SortOption;
    selectedGenres: [];
    minRating: number;
}
const initialState: MoviesState = {
    movies: [],
    allMovies: [],
    genres: [],
    loading: false,
    error: null,
    sortBy: 'voteAverage',
    selectedGenres: [],
    minRating: 0,
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const [moviesResponse, genresResponse] = await Promise.all([
            tmdbApi.get('/trending/movie/day'),
            tmdbApi.get('/genre/movie/list'),
        ]);
        const genresMap: Record<number, string> = {};
        genresResponse.data.genres.forEach((genre: { id: number; name: string }) => {
            genresMap[genre.id] = genre.name;
        });
        return moviesResponse.data.results.map((movie: Record<string, any>) => ({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date ? movie.release_date.slice(0, 4) : '',
            voteAverage: Number(movie.vote_average.toFixed(1)),
            genres: movie.genre_ids.map((id: number) => genresMap[id] || 'Кіно'),
        }));
    }
);

const applyFiltersAndSorting = (
    moviesList: Movie[],
    sortBy: string,
    selectedGenres: string[],
    minRating: number
) => {
    const filtered = moviesList.filter((movie) => {
        const matchesGenres = selectedGenres.length > 0
            ? selectedGenres.some((genre) => movie.genres.includes(genre))
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

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            state.movies = applyFiltersAndSorting(
                state.allMovies,
                state.sortBy,
                state.selectedGenres,
                state.minRating
            );
        },
        setGenreFilter: (state, action) => {
            state.selectedGenres = action.payload;
            state.movies = applyFiltersAndSorting(
                state.allMovies,
                state.sortBy,
                state.selectedGenres,
                state.minRating
            );
        },
        setMinRatingFilter: (state, action) => {
            state.minRating = action.payload;
            state.movies = applyFiltersAndSorting(
                state.allMovies,
                state.sortBy,
                state.selectedGenres,
                state.minRating
            );
        },
        resetFilters: (state) => {
            state.sortBy = 'voteAverage';
            state.selectedGenres = [];
            state.minRating = 0;
            state.movies = applyFiltersAndSorting(state.allMovies, 'voteAverage', [], 0);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.allMovies = action.payload;

                const allGenresSet = new Set<string>();
                action.payload.forEach((movie: Movie) => {
                    movie.genres.forEach((genre) => allGenresSet.add(genre));
                });

                state.genres = Array.from(allGenresSet);
                state.movies = applyFiltersAndSorting(
                    action.payload,
                    state.sortBy,
                    state.selectedGenres,
                    state.minRating
                );
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            });
    },
});

export const {
    setSortBy,
    setGenreFilter,
    setMinRatingFilter,
    resetFilters
} = moviesSlice.actions;

export default moviesSlice.reducer;