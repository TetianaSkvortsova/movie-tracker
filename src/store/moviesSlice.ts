import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tmdbApi} from "../api/tmbd.ts";
import type {Genre, GenreState} from "./genresSlice.ts";
import {mapMovieToStore, type SortBy} from "../components/utils/utils.ts";

export interface Movie {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    genre: Genre;
}

export interface MoviesState {
    movies: Movie[];
    sortBy: SortBy;
    loading: boolean;
    error: string | null;
    selectedGenres: string[];
    minRating: number;
    searchQuery: string;
    searchMovieLoading: boolean;
    searchMovieError: string | null;
}

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
    sortBy: 'voteAverage',
    selectedGenres: [],
    minRating: 0,
    searchQuery: '',
    searchMovieLoading: false,
    searchMovieError: null,
}

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (_, thunkAPI) => {
        const response = await tmdbApi.get('/trending/movie/day');
        const state = thunkAPI.getState() as { genres: GenreState };
        const genresList = state.genres.genres;
        return mapMovieToStore(response.data.results, genresList);
    })

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (query: string, {getState}) => {
        if (!query.trim()) {
            return [];
        }

        const response = await tmdbApi.get('/search/movie', {
            params: {
                query: query,
                language: 'uk-UA',
            },
        });
        const state = getState() as { genres: GenreState };
        const genresList = state.genres.genres;
        console.log(response, state);
        return mapMovieToStore(response.data.results, genresList);
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setGenreFilter: (state, action) => {
            state.selectedGenres = action.payload;
        },
        setMinRatingFilter: (state, action) => {
            state.minRating = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        resetFilters: (state) => {
            state.sortBy = 'voteAverage';
            state.selectedGenres = [];
            state.minRating = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(searchMovies.pending, (state) => {
                state.searchMovieLoading = true;
                state.searchMovieError = null;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.searchMovieLoading = false;
                state.searchMovieError = action.error.message || 'Помилка завантаження';
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.searchMovieLoading = false;
            })
    }
})
export const {
    setSortBy,
    setGenreFilter,
    setMinRatingFilter,
    resetFilters
} = moviesSlice.actions;
export default moviesSlice.reducer;