import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tmdbApi} from "../api/tmbd.ts";

export interface Movie {
    id: number;
    title: string;
    poster_path : string;
    release_date: string;
    vote_average: boolean;
}

interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}
// const initialMovies: Movies[] = [];
const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        // Використовуємо ендпоінт популярних або трендових фільмів
        const response = await tmdbApi.get('/trending/movie/day');
        return response.data.results; // Повертає масив фільмів
    }
);

const moviesSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                // Записуємо отримані фільми в стейт
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            });
    },
});
export default moviesSlice.reducer;
