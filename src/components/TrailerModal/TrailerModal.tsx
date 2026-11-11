import { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { tmdbApi } from "../../api/tmbd";

interface TrailerModalProps {
    movieId: number | null;
    visible: boolean;
    onClose: () => void;
}

export const TrailerModal = ({ movieId, visible, onClose }: TrailerModalProps) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!movieId || !visible) return;

        const fetchTrailer = async () => {
            setLoading(true);
            try {
                const { data } = await tmdbApi.get(`/movie/${movieId}/videos`);
console.log(data.results);``
                const trailer = data.results.find(
                    (vid: {site:string, type: string}) => vid.site === "YouTube" && vid.type === "Trailer"
                ) || data.results.find((vid: {site:string}) => vid.site === "YouTube");

                setTrailerKey(trailer ? trailer.key : null);
            } catch (err) {
                console.error("Помилка завантаження трейлера:", err);
                setTrailerKey(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer().catch((err) => console.error(err));
    }, [movieId, visible]);

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            destroyOnHidden
            className="trailer-modal"
        >
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mt-6 flex items-center justify-center">
                {loading ? (
                    <Spin size="large" />
                ) : trailerKey ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&enablejsapi=1`}
                        title="Movie Trailer"
                        className="w-full h-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="text-slate-400 font-medium">
                        На жаль, трейлер для цього фільму відсутній 😔
                    </div>
                )}
            </div>
        </Modal>
    );
};