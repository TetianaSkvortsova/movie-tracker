import {combineReducers, configureStore} from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice.ts';
import bannerReducer from './bannerSlice';
import genresReducer from './genresSlice';

const rootReducer = combineReducers({
    movies: moviesReducer,
    banner: bannerReducer,
    genres: genresReducer,
})

export const store = configureStore({
    reducer: rootReducer,
});

/*store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('movies', JSON.stringify(state.movies.items));
});*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;