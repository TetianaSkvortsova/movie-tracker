import {Button, Carousel, Tag} from "antd";
import {Info, Play, Star} from 'lucide-react';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {fetchWeeklyTrends} from "../../store/bannerSlice.ts";
import {TrailerModal} from "../TrailerModal/TrailerModal.tsx";

export const Banner = () => {
    const dispatch = useAppDispatch();
    const {bannerMovies, loading, error} = useAppSelector((state) => state.banner);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
    const handleOpenTrailer = (movieId: number) => {
        setSelectedMovieId(movieId);
        setIsTrailerOpen(true);
    };

    useEffect(() => {
        dispatch(fetchWeeklyTrends());
    }, [dispatch]);

    if (loading) {
        return <div className="text-center py-10">Завантаження фільмів... ⏳</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Помилка: {error}</div>;
    }

    return (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <Carousel
                autoplay
                fade={true}
                arrows={false}
                infinite easing="linear"
                speed={3000}
            >
                {bannerMovies.map((movie) => (
                    <div key={movie.id} className="relative group outline-none">
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-10"/>
                        <img
                            src={`https://image.tmdb.org/t/p/w1280${movie.backdropPath}`}
                            alt={movie.title}
                            className="w-full h-[360px] md:h-[450px] object-cover"
                        />
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 max-w-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag color="red">🔥 Тренди Тижня</Tag>
                                <Tag color="gold" className="flex items-center gap-1 font-bold px-2 py-0.5">
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/> {movie.voteAverage}
                                </Tag>
                                <span className="text-slate-400 text-sm">{movie.releaseDate}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
                                {movie.title}
                            </h1>
                            <p className="text-slate-300 text-sm md:text-base line-clamp-3 mb-6">
                                {movie.overview}
                            </p>
                            <Button
                                type="primary"
                                size="large"
                                icon={<Play className="w-5 h-5 fill-current"/>}
                                className="bg-red-600 hover:bg-red-700 h-12 px-6 rounded-xl font-semibold flex items-center"
                                onClick={() => handleOpenTrailer(movie.id)}
                            >
                                Дивитися Трейлер
                            </Button>
                            <Button
                                size="large"
                                icon={<Info className="w-5 h-5"/>}
                                className="mx-6 bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-white h-12 px-6 rounded-xl font-semibold flex items-center"
                            >
                                Детальніше
                            </Button>
                        </div>
                    </div>
                ))}
            </Carousel>
            <TrailerModal
                movieId={selectedMovieId}
                visible={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
            />
        </div>
    )
}
