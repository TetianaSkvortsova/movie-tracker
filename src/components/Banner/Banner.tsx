import {Button, Tag} from "antd";
import {Info, Play, Star} from 'lucide-react';

const MOCK_MOVIES = [
    {
        id: 1,
        title: "Dune: Part Two",
        originalTitle: "Dune: Part Two",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
        rating: 8.6,
        year: 2024,
        runtime: "2h 46m",
        genres: ["Sci-Fi", "Adventure", "Action"],
        overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
        trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
        cast: [
            {
                id: 101,
                name: "Timothée Chalamet",
                role: "Paul Atreides",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            },
            {
                id: 102,
                name: "Zendaya",
                role: "Chani",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            },
            {
                id: 103,
                name: "Rebecca Ferguson",
                role: "Lady Jessica",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            },
            {
                id: 104,
                name: "Javier Bardem",
                role: "Stilgar",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
            }
        ]
    }
]

export const Banner = () => {
    return (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group ">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-10"/>
            <img
                src={MOCK_MOVIES[0].backdrop}
                alt={MOCK_MOVIES[0].title}
                className="w-full h-[360px] md:h-[450px] object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                    <Tag color="red" className="font-semibold uppercase tracking-wider px-3 py-1 rounded-md">
                        🔥 Тренди Тижня
                    </Tag>
                    <Tag color="gold" className="flex items-center gap-1 font-bold px-2 py-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/> {MOCK_MOVIES[0].rating}
                    </Tag>
                    <span className="text-slate-400 text-sm">{MOCK_MOVIES[0].year}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
                    {MOCK_MOVIES[0].title}
                </h1>
                <p className="text-slate-300 text-sm md:text-base line-clamp-3 mb-6">
                    {MOCK_MOVIES[0].overview}
                </p>
                <Button
                    type="primary"
                    size="large"
                    icon={<Play className="w-5 h-5 fill-current" />}
                    /*onClick={() => {
                        setSelectedMovie(MOCK_MOVIES[0]);
                        setTrailerModalVisible(true);
                    }}*/
                    className="bg-red-600 hover:bg-red-700 h-12 px-6 rounded-xl font-semibold flex items-center"
                >
                    Дивитися Трейлер
                </Button>
                <Button
                    size="large"
                    icon={<Info className="w-5 h-5" />}
                    /*onClick={() => {
                        setSelectedMovie(MOCK_MOVIES[0]);
                        setIsDetailOpen(true);
                    }}*/
                    className="mx-6 bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-white h-12 px-6 rounded-xl font-semibold flex items-center"
                >
                    Детальніше
                </Button>
            </div>
        </div>
    );
};