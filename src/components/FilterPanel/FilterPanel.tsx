import {Filter} from 'lucide-react';
import {Divider, Row, Col, Select, Typography, Slider, Button} from "antd";
import {useState} from "react";
// import {APP_COLORS} from "../../theme/colors.ts";

const {Text} = Typography;
const SORT_OPTIONS = [
    {value: 'rating', label: 'Рейтингом'},
    {value: 'year', label: 'Роком виходу'},
    {value: 'title', label: 'Назвою'},
];

const GENRES_LIST = ["Sci-Fi", "Action", "Adventure", "Drama", "Biography", "History", "Crime", "Animation", "Mystery"];
const GENRES_OPTIONS = GENRES_LIST.map((genre) => ({
    value: genre,
    label: genre,
}));

export const FilterPanel = () => {
    const [sortBy, setSortBy] = useState('rating');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
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
                        onChange={setSortBy}
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
                        options={GENRES_OPTIONS}
                        onChange={setSelectedGenres}
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
                        onChange={setMinRating}
                        classNames={{
                            rail: 'bg-slate-800',
                            track: 'bg-[#e50914]',
                        }}
                    />
                </Col>
                <Col xs={24} lg={4} className="!flex justify-end">
                    <Button
                        onClick={() => {
                            setSelectedGenres([]);
                            setMinRating(0);
                            setSearchQuery('');
                        }}
                        className="text-xs text-slate-400 hover:text-white "
                    >
                        Скинути фільтри
                    </Button>
                </Col>
            </Row>
        </div>
    );
};