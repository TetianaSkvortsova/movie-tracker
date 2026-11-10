import {combineReducers, configureStore} from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice';
import bannerReducer from './bannerSlice';

const rootReducer = combineReducers({
    banner: bannerReducer,
    movies: moviesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

/*store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('movies', JSON.stringify(state.movies.items));
});*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;