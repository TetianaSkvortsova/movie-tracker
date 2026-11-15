import './App.css';
import {Layout} from 'antd';
import {AppHeader} from "./components/Header/Header.tsx";
import {Banner} from "./components/Banner/Banner.tsx";
import {FilterPanel} from "./components/FilterPanel/FilterPanel.tsx";
import {MoviesGrid} from "./components/MoviesGrid/MoviesGrid.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./store/hooks.ts";
import {fetchMovies} from "./store/moviesSlice.ts";
import {fetchGenres} from "./store/genresSlice.ts";

const {Content} = Layout;

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchGenres());
            await dispatch(fetchMovies());
        };
        loadData();
    }, [dispatch]);


    return (
        <>
            <Layout className="min-h-screen bg-slate-950">
                <AppHeader/>
                <Content className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                    <Banner/>
                    <FilterPanel/>
                    <MoviesGrid/>
                </Content>
            </Layout>
        </>
    )
}

export default App
