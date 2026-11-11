import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tmdbApi} from "../api/tmbd.ts";

export interface BannerMovie {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: string;
    voteAverage: number;
}

interface BannerState {
    bannerMovies: BannerMovie[];
    loading: boolean;
    error: string | null;
}

const initialBannerState: BannerState = {
    bannerMovies: [],
    loading: false,
    error: null,
};

export const fetchWeeklyTrends = createAsyncThunk(
    'bannerMovies/fetchWeeklyTrends',
    async () => {
        const weeklyTrends = await tmdbApi.get('/trending/movie/week');
        console.log(weeklyTrends);
        return weeklyTrends.data.results.map((movie: Record<string, any>) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            releaseDate: movie.release_date ? movie.release_date.slice(0, 4) : '',
            voteAverage: Number(movie.vote_average.toFixed(1)),
        }));
    }
);

const bannerMoviesSlice = createSlice({
    name: 'bannerMovies',
    initialState: initialBannerState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeeklyTrends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeeklyTrends.fulfilled, (state, action) => {
                state.loading = false;
                state.bannerMovies = action.payload; // Зберігаємо у правильне поле
            })
            .addCase(fetchWeeklyTrends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            });
    },
});

export default bannerMoviesSlice.reducer;