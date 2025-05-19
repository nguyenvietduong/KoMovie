import React, { useState, useEffect } from "react";
import SearchMovieRepository from "../../repositories/SearchMovieRepository";
import SearchMovieService from "../../services/SearchMovieService";

const searchMovieService = new SearchMovieService(SearchMovieRepository);

const genres = [
    { label: "Thể loại", value: "" },
    { label: "Hành động", value: "hanh-dong" },
    { label: "Tình cảm", value: "tinh-cam" },
    { label: "Hài", value: "hai-huoc" },
];

const countries = [
    { label: "Quốc gia", value: "" },
    { label: "Việt Nam", value: "viet-nam" },
    { label: "Hàn Quốc", value: "han-quoc" },
    { label: "Mỹ", value: "my" },
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

    console.log(movies);
    

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
        const delayDebounce = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    useEffect(() => {
        fetchMovies();
    }, [filters, currentPage]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Danh Sách Phim</h2>

            {/* BỘ LỌC & TÌM KIẾM */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <select
                    className="px-4 py-2 border rounded shadow-sm"
                    value={filters.genre}
                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                >
                    {genres.map((g, i) => <option key={i} value={g.value}>{g.label}</option>)}
                </select>

                <select
                    className="px-4 py-2 border rounded shadow-sm"
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                >
                    {countries.map((c, i) => <option key={i} value={c.value}>{c.label}</option>)}
                </select>

                <select
                    className="px-4 py-2 border rounded shadow-sm"
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                >
                    <option value="">Năm</option>
                    {years.map((y, i) => <option key={i} value={y.value}>{y.label}</option>)}
                </select>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Tìm kiếm tên phim..."
                    className="px-4 py-2 border rounded shadow-sm w-60"
                />
            </div>

            {/* DANH SÁCH PHIM */}
            {loading ? (
                <p className="text-center text-gray-500">Đang tải phim...</p>
            ) : movies.length === 0 ? (
                <p className="text-center text-red-500 font-semibold">Không tìm thấy phim</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                    {movies.map((movie) => (
                        <div key={movie._id} className="relative group bg-white shadow rounded overflow-hidden">
                            <img
                                src={"https://phimimg.com/" + movie.poster_url}
                                alt={movie.name}
                                className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="p-3">
                                <h3 className="font-semibold text-sm truncate">{movie.name}</h3>
                                <p className="text-xs text-gray-500">{movie.country?.[0].name} • {movie.year}</p>
                            </div>

                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href={`/movies/${movie.slug}`} className="bg-pink-500 text-white px-4 py-2 text-sm rounded-full hover:bg-pink-600 transition">🎬 Xem</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PHÂN TRANG */}
            {/* PHÂN TRANG */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
                {/* Nút Prev */}
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-blue-100"
                        }`}
                >
                    Prev
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
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-600 hover:bg-blue-100"
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
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-blue-100"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
