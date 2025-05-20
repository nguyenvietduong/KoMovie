import React, { useState, useEffect, useRef } from "react";
import SearchMovieRepository from "../repositories/SearchMovieRepository";
import SearchMovieService from "../services/SearchMovieService";
import { Link } from "react-router-dom";

const searchMovieService = new SearchMovieService(SearchMovieRepository);

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState(false);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const resultsRef = useRef(null);
    const scrollThrottle = useRef(false);
    const containerRef = useRef(null);

    const fetchMovies = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const data = await searchMovieService.searchMovies({
                keyword: search,
                page: currentPage,
                category: "",
                country: "",
                year: "",
                limit: 30,
            });

            const newItems = data.data?.items || [];
            setResults(prev => [...prev, ...newItems]);

            const total = data.data?.params?.pagination?.totalPages || 1;
            setTotalPages(total);
            if (currentPage >= total) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Lỗi tải phim:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch movies khi search hoặc currentPage thay đổi, với debounce
    useEffect(() => {
        if (!searchTerm) return; // Không gọi khi modal đóng
        const delayDebounce = setTimeout(() => {
            if (search.trim() !== "") {
                fetchMovies();
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [currentPage, search, searchTerm]);

    useEffect(() => {
        setResults([]);
        setCurrentPage(1);
        setHasMore(true);
        scrollThrottle.current = false;
    }, [search]);

    // Xử lý scroll load thêm
    const handleScroll = () => {
        if (loading || !hasMore || scrollThrottle.current) return;

        const el = resultsRef.current;
        if (!el) return;

        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
        if (nearBottom) {
            scrollThrottle.current = true;
            setCurrentPage(prev => prev + 1);
            setTimeout(() => {
                scrollThrottle.current = false;
            }, 500);
        }
    };

    // Thêm event scroll cho div kết quả
    useEffect(() => {
        const el = resultsRef.current;
        if (!el || !searchTerm) return;

        const handle = () => handleScroll();
        el.addEventListener("scroll", handle);

        return () => {
            el.removeEventListener("scroll", handle);
        };
    }, [searchTerm]);

    // Xử lý click ngoài modal để đóng và reset dữ liệu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setSearchTerm(false);
                setSearch("");
                setResults([]);
                setCurrentPage(1);
                setHasMore(true);
            }
        };

        if (searchTerm) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchTerm]);

    return (
        <div className="relative" ref={containerRef} onClick={() => setSearchTerm(!searchTerm)}>
            <button
                type="button"
                className="flex items-center gap-x-1 text-sm/6 font-semibold text-white"
                onClick={() => {
                    if (searchTerm) {
                        setSearchTerm(false);
                        setSearch("");
                        setResults([]);
                        setCurrentPage(1);
                        setHasMore(true);
                    } else {
                        setSearchTerm(true);
                    }
                }}
            >
                <span>🔍 Tìm kiếm </span>
            </button>

            {searchTerm && (
                <div
                    className="absolute left-40 mt-1 lg:left-[-100px] lg:mt-2 w-48 rounded-md bg-gray-900 shadow-lg ring-1 ring-gray-700 ring-opacity-50 z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-full -left-44 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-gray-700">
                        <div className="p-4">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm tên phim..."
                                className="px-4 py-2 mb-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded w-full focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <div ref={resultsRef} className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                                {results.map((movie) => (
                                    <Link
                                        to={"/movies/" + movie.slug}
                                        key={movie._id}
                                        className="group relative flex items-center gap-x-6 rounded-lg px-4 p-2 text-sm/6 bg-gray-800 text-white hover:bg-gray-700 transition"
                                        onClick={() => {
                                            setSearchTerm(false);
                                            setSearch("");
                                            setResults([]);
                                            setCurrentPage(1);
                                            setHasMore(true);
                                        }}
                                    >
                                        <div className="flex size-12 flex-none items-center justify-center rounded-lg bg-gray-700">
                                            <img src={"https://phimimg.com/" + movie.poster_url} alt="image" className="rounded" />
                                        </div>
                                        <div className="flex-auto">
                                            <p className="mb-1 font-semibold text-white">{movie.name}</p>
                                            <p className="text-gray-400">{movie.origin_name}</p>
                                        </div>
                                    </Link>
                                ))}

                                {loading && <p className="text-center text-gray-400">Đang tải...</p>}

                                {!hasMore && results.length > 0 && (
                                    <p className="text-center text-green-400">Đã hiển thị toàn bộ kết quả.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}