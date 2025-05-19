import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WatchPlayer from "../components/WatchPlayer";
import TrailerPlayer from "../components/TrailerPlayer";
import Breadcrumb from '../components/Breadcrumb';
import axios from "axios";

export default function MovieDetail() {
    const { movieSlug } = useParams();
    const [selectedSrc, setSelectedSrc] = useState(null);
    const [trailerSrc, setTrailerSrc] = useState(null);
    const [movie, setMovie] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://phimapi.com/phim/${movieSlug}`);
                setMovie(res.data.movie);
                setEpisodes(res.data.episodes || []);
            } catch (err) {
                setError("Không tìm thấy phim hoặc lỗi server.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieSlug]);

    const breadcrumbItems = [
        { label: "Trang chủ", to: "/" },
        { label: "Danh sách phim", to: "/movies" },
        { label: movie ? movie.name : "Không tìm thấy", to: "#" },
    ];

    if (loading) return <p className="text-center mt-10">Đang tải phim...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!movie) return null;

    return (
        <>
            <div className="container mx-auto px-4 py-4">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="relative">

                {/* NỀN LÀ THUMB + OVERLAY */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(${movie.thumb_url})`,
                        filter: "blur(10px)",
                        transform: "scale(1.05)",
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

                {/* NỘI DUNG CHÍNH */}
                <div className="relative z-20 p-14 max-w-6xl mx-auto text-white">
                    <div className="flex flex-col md:flex-row gap-12 items-start">

                        {/* POSTER */}
                        <div className="relative group w-full md:w-1/3 rounded-lg overflow-hidden shadow-x bg-black">
                            <img
                                src={movie.poster_url}
                                alt={movie.name}
                                className="w-full h-auto object-cover"
                            />

                            {/* Overlay mờ khi hover */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 rounded-lg">
                                <button
                                    onClick={() => setTrailerSrc(movie.trailer_url)}
                                    className="bg-white text-pink-600 px-4 py-2 rounded hover:bg-pink-100"
                                >
                                    📺 Trailer
                                </button>
                            </div>
                        </div>

                        {/* THÔNG TIN & DANH SÁCH TẬP PHIM */}
                        <div className="flex-1 bg-gray-900 bg-opacity-60 rounded-lg p-6 shadow-lg">
                            <h1 className="text-4xl font-bold mb-6">{movie.name}</h1>

                            <div className="space-y-3 mb-6">
                                <p><strong>Trạng thái:</strong> {movie.episode_current}</p>
                                <p><strong>Năm:</strong> {movie.year}</p>
                                <p><strong>Quốc gia:</strong> {movie.country?.map(c => c.name).join(", ")}</p>
                                <p><strong>Thể loại:</strong> {movie.category?.map(cat => cat.name).join(", ")}</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Mô tả phim:</h2>
                                <p>{movie.content || "Chưa có mô tả."}</p>
                            </div>

                            {/* DANH SÁCH TẬP PHIM */}
                            {movie.episode_current !== "Full" ? (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Danh sách tập phim</h2>
                                    <div className="flex flex-col gap-6 max-h-[320px] overflow-y-auto pr-2">
                                        {episodes.map((server, sIdx) => (
                                            <div key={sIdx}>
                                                <h3 className="font-semibold mb-2 text-white">{server.server_name}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {server.server_data.map((ep, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setSelectedSrc(ep.link_embed)}
                                                            className="bg-white text-black px-4 py-2 min-w-[80px] rounded hover:bg-gray-300 text-sm"
                                                        >
                                                            {ep.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-6 flex gap-4 flex-wrap">
                                    <button
                                        onClick={() => setSelectedSrc(episodes[0].server_data[0].link_embed)}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
                                    >
                                        🎬 Xem Phim
                                    </button>
                                </div>
                            )}

                            {/* Player */}
                            {selectedSrc && <WatchPlayer src={selectedSrc} onClose={() => setSelectedSrc(null)} />}
                            {trailerSrc && <TrailerPlayer src={trailerSrc} onClose={() => setTrailerSrc(null)} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
