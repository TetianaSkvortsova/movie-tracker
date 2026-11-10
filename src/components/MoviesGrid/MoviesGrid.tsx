import {Col, Row, Typography, Tooltip, Button, Tag} from "antd";

const {Title} = Typography;
import {Film, Heart, Bookmark, Play, Star, Check} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {fetchMovies} from "../../store/moviesSlice.ts";

// import {useState} from "react";

export const MoviesGrid = () => {
    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const dispatch = useAppDispatch();
    const { movies, loading } = useAppSelector((state) => state.movies);
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Title level={4} className="!text-white !m-0 flex items-center gap-2">
                    <Film className="w-5 h-5 text-red-500"/>
                    <span>Каталог фільмів ({10})</span>
                </Title>
            </div>

            {/*    Add block if no films found*/}
            <Row gutter={[20, 24]}>

                {movies.map((movie) => {
                    const isWatchlisted = false;
                    const isWatchedItem = false;
                    const isFav = true;
                    return (
                        <Col key={movie.id} xs={12} sm={8} md={6} lg={4}>
                            <div
                                /*onClick={() => {
                                    setSelectedMovie(movie);
                                    setIsDetailOpen(true);
                                }}*/
                                className="group relative bg-[#1e293b] rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition duration-300 cursor-pointer flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
                                    <img
                                        src={`${IMG_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-between z-10">
                                        <div className="flex justify-end gap-1.5">
                                            <Tooltip title={isFav ? "Улублено" : "Додати в улюблене"}>
                                                <button
                                                    // onClick={(e) => toggleFavorite(movie.id, e)}
                                                    className={`p-2 rounded-full backdrop-blur-md transition ${isFav ? 'bg-red-600 text-white' : 'bg-black/40 text-slate-300 hover:text-white'}`}
                                                >
                                                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`}/>
                                                </button>
                                            </Tooltip>

                                            <Tooltip title={isWatchlisted ? "В планах" : "Хочу подивитися"}>
                                                <button
                                                    // onClick={(e) => toggleWatchlist(movie.id, e)}
                                                    className={`p-2 rounded-full backdrop-blur-md transition ${isWatchlisted ? 'bg-indigo-600 text-white' : 'bg-black/40 text-slate-300 hover:text-white'}`}
                                                >
                                                    <Bookmark
                                                        className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`}/>
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <div className="space-y-2">
                                            <Button
                                                type="primary"
                                                block
                                                size="small"
                                                icon={<Play className="w-3.5 h-3.5 fill-current"/>}
                                                /*onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedMovie(movie);
                                                    setTrailerModalVisible(true);
                                                }}*/
                                                className="bg-red-600 hover:bg-red-700 text-xs font-semibold rounded-lg"
                                            >
                                                Трейлер
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 left-2 z-0">
                                        <span
                                            className="bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                          <Star className="w-3 h-3 fill-amber-400 text-amber-400"/> {movie.vote_average}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-red-400 transition">
                                            {movie.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                                            <span>{movie.release_date}</span>
                                            {/*<span className="truncate max-w-[80px]">{movie.genres[0]}</span>*/}
                                            <span className="truncate max-w-[80px]">Жанр</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                                        {isWatchedItem ? (
                                            <Tag color="green" className="text-[10px] m-0 border-none flex items-center gap-1">
                                                <Check className="w-3 h-3" /> Переглянуто
                                            </Tag>
                                        ) : isWatchlisted ? (
                                            <Tag color="blue" className="text-[10px] m-0 border-none">
                                                В планах
                                            </Tag>
                                        ) : (
                                            <span className="text-[10px] text-slate-500">Не переглянуто</span>
                                        )}

                                        {movie.vote_average && (
                                            <span className="text-xs text-amber-400 font-bold flex items-center gap-0.5">
                                    ★ {movie.vote_average}/10
                                  </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
};