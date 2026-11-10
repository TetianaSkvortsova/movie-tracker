import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
});

/*store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('movies', JSON.stringify(state.movies.items));
});*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;