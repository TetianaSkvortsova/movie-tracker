import {Filter} from 'lucide-react';
import {Divider, Row, Col, Select, Typography, Slider, Button} from "antd";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {resetFilters, setGenreFilter, setMinRatingFilter, setSortBy} from "../../store/moviesSlice";

const {Text} = Typography;
const SORT_OPTIONS = [
    {value: 'voteAverage', label: 'Рейтингом'},
    {value: 'releaseDate', label: 'Роком виходу'},
    {value: 'title', label: 'Назвою'},
];

export const FilterPanel = () => {
    const dispatch = useAppDispatch();
    const genresList = useAppSelector((state) => state.movies.genres);
    const genresOptions = genresList.map((genre: string) => ({
        value: genre,
        label: genre,
    }));
    const selectedGenres = useAppSelector((state) => state.movies.selectedGenres);
    const handleGenreChange = (values: string[]) => {
        dispatch(setGenreFilter(values));
    };
    const sortBy = useAppSelector((state) => state.movies.sortBy);
    const handleSortChange = (value: string) => {
        dispatch(setSortBy(value));
    };
    const minRating = useAppSelector((state) => state.movies.minRating);
    const handleRatingChange = (value: number) => {
        dispatch(setMinRatingFilter(value));
    };
    const handleReset = () => {
        dispatch(resetFilters());
    };
    return (
        <div className="bg-[#1e293b]/90 p-5 rounded-2xl border border-slate-800 space-y-4 my-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 font-semibold text-lg text-slate-200">
                    <Filter className="w-5 h-5 text-red-500"/>
                    <span>Фільтри та сортування</span>
                </div>

                <div className="flex items-center gap-3">
                    <Text className="text-slate-400 text-sm">Сортувати за:</Text>
                    <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        options={SORT_OPTIONS}
                        className="w-40"
                    />
                </div>
            </div>
            <Divider className="my-2 border-slate-800"/>
            <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={12} lg={10}>
                    <Text className="text-slate-400 text-xs block mb-1">Жанри:</Text>
                    <Select
                        mode="multiple"
                        placeholder="Оберіть жанри..."
                        value={selectedGenres}
                        options={genresOptions}
                        onChange={handleGenreChange}
                        className="w-full"

                        allowClear
                    >
                    </Select>
                </Col>
                <Col xs={24} md={12} lg={10}>
                    <Text className="text-slate-400 text-xs block mb-1">
                        Мінімальний рейтинг TMDB: <strong className="text-amber-400">{minRating}+</strong>
                    </Text>
                    <Slider
                        min={0}
                        max={10}
                        step={0.5}
                        value={minRating}
                        onChange={handleRatingChange}
                        classNames={{
                            rail: 'bg-slate-800',
                            track: 'bg-[#e50914]',
                        }}
                    />
                </Col>
                <Col xs={24} lg={4} className="!flex justify-end">
                    <Button
                        onClick={handleReset}
                        className="text-xs text-slate-400 hover:text-white "
                    >
                        Скинути фільтри
                    </Button>
                </Col>
            </Row>
        </div>
    );
};