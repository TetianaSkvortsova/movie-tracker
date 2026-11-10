import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tmdbApi} from "../api/tmbd.ts";

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
    loading: boolean;
    error: string | null;
}
const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
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

const moviesSlice = createSlice({
    name: 'movies',
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
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            });
    },
});

export default moviesSlice.reducer;
