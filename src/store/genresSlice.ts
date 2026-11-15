import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tmdbApi} from "../api/tmbd.ts";

export interface Genre {
    id: number;
    name: string;
}

export interface GenreState {
    genres: Genre[];
    loading: boolean;
    error: string | null;
}

const initialState: GenreState = {
    genres: [],
    loading: false,
    error: null,
}

export const fetchGenres = createAsyncThunk(
    'movies/fetchGenres',
    async () => {
        const response = await tmdbApi.get('/genre/movie/list');
        return response.data.genres;
    })

const genresSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
                state.loading = false;
            })
    }
})

export default genresSlice.reducer;