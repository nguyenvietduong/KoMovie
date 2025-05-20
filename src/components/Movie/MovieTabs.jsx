import { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../../hooks/useFavorites";
import { Link } from "react-router-dom";

const tabs = [
    { label: "Phim Bộ", value: "phim-bo" },
    { label: "Phim Lẻ", value: "phim-le" },
    { label: "TV Shows", value: "tv-shows" },
    { label: "Hoạt Hình", value: "hoat-hinh" },
    { label: "Vietsub", value: "phim-vietsub" },
    { label: "Thuyết Minh", value: "phim-thuyet-minh" },
    { label: "Lồng Tiếng", value: "phim-long-tieng" },
];

export default function MovieTabs() {
    const [activeTab, setActiveTab] = useState("phim-bo");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const res = await axios.get(`https://phimapi.com/v1/api/danh-sach/${activeTab}`, {
                    params: {
                        page: 1,
                        sort_field: "modified.time",
                        sort_type: "desc",
                        sort_lang: "",
                        category: "",
                        country: (activeTab == "hoat-hinh" ? "nhat-ban" : ""),
                        year: "",
                        limit: 14,
                    },
                });
                setMovies(res.data.data.items || []);
            } catch (err) {
                console.error("Lỗi khi tải danh sách phim:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [activeTab]);

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">| Danh sách phim theo thể loại</h3>

            <div className="flex flex-wrap justify-center gap-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`relative overflow-hidden px-4 py-2 w-[120px] rounded border text-sm font-medium transition-all duration-300 group ${isActive
                                ? 'bg-green-600 text-white border-green-600'
                                : 'border-green-600 text-green-600'
                                }`}
                        >
                            <span
                                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </span>

                            {!isActive && (
                                <span className="absolute inset-0 bg-green-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0 rounded"></span>
                            )}
                        </button>
                    );
                })}
            </div>

            {loading ? (
                <p className="text-center text-white">Đang tải phim...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {movies.map((movie) => {
                        const isFavorite = Array.isArray(favorites) && favorites.some(fav => fav.slug === movie.slug);

                        return (
                            <div key={movie._id || movie.slug} className="relative group">
                                <div
                                    className="block group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={"https://phimimg.com/" + movie.poster_url}
                                        alt={movie.name}
                                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                        {movie.quality} | {movie.lang}
                                    </div>
                                    <div className="p-2 bg-zinc-900 text-white text-sm font-semibold truncate text-center">
                                        {movie.name} ({movie.year})
                                    </div>

                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link to={`/movies/${movie.slug}`} className="group w-14 h-14 flex items-center justify-center rounded-full bg-black transition-colors duration-500 hover:bg-red-600 hover:animate-spin-once">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="w-6 h-6 text-white transition-colors duration-500 group-hover:text-green-400"
                                            >
                                                <polygon points="9.5,7.5 16,12 9.5,16.5" fill="currentColor" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                                {/* Nút yêu thích góc trên phải */}
                                <button
                                    onClick={() => toggleFavorite(movie)}
                                    className="absolute top-2 right-2 z-20 p-1 rounded-full focus:outline-none"
                                    title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                    aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                                >
                                    {isFavorite ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-red-600 drop-shadow-md"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            stroke="none"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
