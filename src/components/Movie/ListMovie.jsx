import React, { useState, useEffect } from "react";
import SearchMovieRepository from "../../repositories/SearchMovieRepository";
import SearchMovieService from "../../services/SearchMovieService";
import { useFavorites } from "../../hooks/useFavorites";
import { Link } from "react-router-dom";

const searchMovieService = new SearchMovieService(SearchMovieRepository);

const genres = [
    { label: "Thể loại", value: "" },
    { label: "Hành động", value: "hanh-dong" },
    { label: "Tình cảm", value: "tinh-cam" },
    { label: "Hài", value: "hai-huoc" },
    { label: "Kinh dị", value: "kinh-di" },
    { label: "Viễn tưởng", value: "vien-tuong" },
    { label: "Hoạt hình", value: "hoat-hinh" },
    { label: "Tâm lý", value: "tam-ly" },
    { label: "Hình sự", value: "hinh-su" },
    { label: "Chiến tranh", value: "chien-tranh" },
    { label: "Cổ trang", value: "co-trang" },
    { label: "Võ thuật", value: "vo-thuat" },
    { label: "Phiêu lưu", value: "phieu-luu" },
    { label: "Thần thoại", value: "than-thoai" },
    { label: "TV Show", value: "tv-show" },
    { label: "Tài liệu", value: "tai-lieu" },
    { label: "Âm nhạc", value: "am-nhac" },
    { label: "Gia đình", value: "gia-dinh" },
    { label: "Học đường", value: "hoc-duong" }
];

const countries = [
    { label: "Quốc gia", value: "" },
    { label: "Việt Nam", value: "viet-nam" },
    { label: "Hàn Quốc", value: "han-quoc" },
    { label: "Nhật Bản", value: "nhat-ban" },
    { label: "Trung Quốc", value: "trung-quoc" },
    { label: "Thái Lan", value: "thai-lan" },
    { label: "Pháp", value: "phap" },
    { label: "Mỹ", value: "my" },
    { label: "Anh", value: "anh" },
    { label: "Đức", value: "duc" },
    { label: "Ấn Độ", value: "an-do" },
    { label: "Canada", value: "canada" },
    { label: "Tây Ban Nha", value: "tay-ban-nha" },
    { label: "Ý", value: "y" },
    { label: "Úc", value: "uc" },
    { label: "Nga", value: "nga" },
    { label: "Philippines", value: "philippines" },
    { label: "Indonesia", value: "indonesia" },
    { label: "Brazil", value: "brazil" },
    { label: "Mexico", value: "mexico" }
];

const years = Array.from({ length: 10 }).map((_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
});

export default function ListMovie() {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({ genre: "", country: "", year: "" });
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const { favorites, toggleFavorite } = useFavorites();

    const fetchMovies = async () => {
        setLoading(true);
        try {
            let data;
            if (search.trim() === "") {
                data = await searchMovieService.getListMovies({
                    type_list: "phim-bo",
                    page: currentPage,
                    sort_field: "_id",
                    sort_type: "desc",
                    sort_lang: "",
                    category: filters.genre,
                    country: filters.country,
                    year: filters.year,
                    limit: 30,
                });
            } else {
                data = await searchMovieService.searchMovies({
                    keyword: search,
                    page: currentPage,
                    category: filters.genre,
                    country: filters.country,
                    year: filters.year,
                    limit: 30,
                });
            }

            setMovies(data.data?.items || []);
            setTotalPages(data.data?.params?.pagination?.totalPages || 1);
        } catch (err) {
            console.error("Lỗi tải phim:", err);
        } finally {
            setLoading(false);
        }
    };

    const getPages = () => {
        const range = (start, end) => {
            const length = end - start + 1;
            return Array.from({ length }, (_, i) => start + i);
        };

        if (totalPages <= 7) {
            return range(1, totalPages);
        } else {
            if (currentPage <= 4) {
                return [1, 2, 3, 4, 5, '...', totalPages];
            } else if (currentPage >= totalPages - 3) {
                return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filters]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, filters, currentPage]);

    useEffect(() => {
        fetchMovies();
    }, [filters, currentPage]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Danh Sách Phim</h2>

            {/* BỘ LỌC & TÌM KIẾM */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                {/* Select thể loại */}
                <div className="relative inline-block w-40">
                    <select
                        className="block w-full px-4 py-2 border border-gray-300 rounded appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.genre}
                        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                    >
                        {genres.map((g, i) => (
                            <option key={i} value={g.value}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        ▼
                    </div>
                </div>

                {/* Select quốc gia */}
                <div className="relative inline-block w-40">
                    <select
                        className="block w-full px-4 py-2 border border-gray-300 rounded appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.country}
                        onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    >
                        {countries.map((c, i) => (
                            <option key={i} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        ▼
                    </div>
                </div>

                {/* Select năm */}
                <div className="relative inline-block w-40">
                    <select
                        className="block w-full px-4 py-2 border border-gray-300 rounded appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    >
                        <option value="">Năm</option>
                        {years.map((y, i) => (
                            <option key={i} value={y.value}>
                                {y.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                        ▼
                    </div>
                </div>

                {/* Ô tìm kiếm */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Tìm kiếm tên phim..."
                    className="px-4 py-2 border border-gray-300 rounded shadow-sm w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* DANH SÁCH PHIM */}
            {loading ? (
                <p className="text-center text-white">Đang tải phim...</p>
            ) : movies.length === 0 ? (
                <p className="text-center text-red-500 font-semibold">Không tìm thấy phim</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                    {movies.map((movie) => {
                        const isFavorite = Array.isArray(favorites) && favorites.some(fav => fav._id === movie._id);

                        return (
                            <div key={movie._id} className="relative group bg-white shadow rounded overflow-hidden">
                                <img
                                    src={"https://phimimg.com/" + movie.poster_url}
                                    alt={movie.name}
                                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Nút yêu thích góc trên phải */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(movie);
                                    }}
                                    className="absolute top-2 right-2 z-10 p-1 rounded-full focus:outline-none"
                                    title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                    aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                                >
                                    {isFavorite ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-7 w-7 text-red-600 drop-shadow-md"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            stroke="none"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-7 w-7 text-gray-400 hover:text-red-500 transition-colors duration-300"
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

                                <div className="p-3">
                                    <h3 className="font-semibold text-sm truncate">{movie.name}</h3>
                                    <p className="text-xs text-gray-500">{movie.country?.[0].name} • {movie.year}</p>
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
                        );
                    })}
                </div>
            )}

            {/* PHÂN TRANG */}
            {/* PHÂN TRANG */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
                {/* Nút Prev */}
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || loading}
                    className={`px-4 py-2 border rounded ${currentPage === 1 || loading
                        ? "boder-[3px] text-gray-400 cursor-not-allowed"
                        : "boder-[3px] text-white hover:bg-blue-100 hover:text-black"
                        }`}
                >
                    Trở về
                </button>

                {getPages().map((page, idx) =>
                    page === "..." ? (
                        <span key={idx} className="px-4 py-2 text-gray-500 select-none">
                            ...
                        </span>
                    ) : (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded ${currentPage === page
                                ? "boder-[3px] text-black bg-blue-100"
                                : "boder-[3px] text-white hover:bg-blue-100 hover:text-black"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Nút Next */}
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded ${currentPage === totalPages
                        ? "boder-[3px] text-gray-400 cursor-not-allowed"
                        : "boder-[3px] text-white hover:bg-blue-100 hover:text-black"
                        }`}
                >
                    Tiếp
                </button>
            </div>
        </div>
    );
}
