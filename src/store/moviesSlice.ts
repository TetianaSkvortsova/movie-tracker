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
    loading: boolean;
    error: string | null;
    sortBy: SortOption;
}
const initialState: MoviesState = {
    movies: [],
    allMovies: [],
    loading: false,
    error: null,
    sortBy: 'voteAverage',
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

const sortMovies = (moviesList: Movie[], sortBy: string) => {
    return [...moviesList].sort((a, b) => {
        if (sortBy === 'voteAverage') {
            return b.voteAverage - a.voteAverage;
        }
        // Add sorts
        return 0;
    });
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        /*setSortBy: (state, action) => {
            state.sortBy = action.payload;
            if (action.payload === 'voteAverage') {
                state.movies.sort((a, b) => b.voteAverage-a.voteAverage);
            }
        },
        resetFilters: (state) => {
            state.sortBy = 'voteAverage';
            state.movies = [...state.allMovies];
        }*/
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
                state.movies = sortMovies(action.payload, state.sortBy);
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            });
    },
});

export default moviesSlice.reducer;
