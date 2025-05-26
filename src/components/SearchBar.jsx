import React, { useState, useEffect, useRef } from "react";
import { useSearchHistory } from "../hooks/useSearchHistory"; // Đường dẫn tùy bạn
import SearchMovieRepository from "../repositories/SearchMovieRepository";
import SearchMovieService from "../services/SearchMovieService";
import { Link } from "react-router-dom";

const searchMovieService = new SearchMovieService(SearchMovieRepository);

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState(false); // modal search mở/đóng
    const [search, setSearch] = useState(""); // giá trị input search
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const resultsRef = useRef(null);
    const scrollThrottle = useRef(false);
    const containerRef = useRef(null);

    const { history, addSearchTerm, clearHistory } = useSearchHistory();

    // Giả sử đây là hàm fetch dữ liệu phim theo từ khóa (bạn có thể dùng lại hàm fetchMovies trong code bạn)
    const fetchMovies = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            // giả sử searchMovieService.searchMovies là API gọi tìm phim
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

    // Khi search thay đổi hoặc trang tăng thì gọi fetch (debounce)
    useEffect(() => {
        console.log("useEffect searchTerm:", searchTerm, "search:", search);
        if (!searchTerm) return;
        if (search.trim() === "") return;

        const timer = setTimeout(() => {
            console.log("Calling fetchMovies with search:", search);
            fetchMovies();
        }, 300);

        return () => clearTimeout(timer);
    }, [search, currentPage, searchTerm]);

    // Reset khi search thay đổi
    useEffect(() => {
        setResults([]);
        setCurrentPage(1);
        setHasMore(true);
        scrollThrottle.current = false;
    }, [search]);

    // Scroll load thêm (giống code bạn)
    const handleScroll = () => {
        if (loading || !hasMore || scrollThrottle.current) return;

        const el = resultsRef.current;
        if (!el) return;

        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
        if (nearBottom) {
            scrollThrottle.current = true;
            setCurrentPage((prev) => prev + 1);
            setTimeout(() => {
                scrollThrottle.current = false;
            }, 500);
        }
    };

    useEffect(() => {
        const el = resultsRef.current;
        if (!el || !searchTerm) return;

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [searchTerm]);

    // Khi click ngoài modal đóng, reset
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchTerm]);

    // Khi người dùng chọn 1 từ khóa lịch sử tìm kiếm thì set search luôn và fetch
    const handleSelectHistory = (term) => {
        setSearch(term);
        setSearchTerm(false);
        addSearchTerm(term);
        // Nếu muốn gọi fetch ngay thì setCurrentPage(1) + fetchMovies()
        setResults([]);
        setCurrentPage(1);
        setHasMore(true);
    };

    // Khi người dùng submit (nhấn Enter), lưu lịch sử
    const handleSearchSubmit = () => {
        if (search.trim() === "") return;
        addSearchTerm(search.trim());
        setResults([]);
        setCurrentPage(1);
        setHasMore(true);
        // Gọi fetchMovies(); hoặc để useEffect lo
    };

    return (
        <div className="relative" ref={containerRef} onClick={() => setSearchTerm(true)}>
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
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearchSubmit();
                                        setSearchTerm(false);
                                    }
                                }}
                            />

                            {/* Nếu chưa nhập gì thì hiển thị lịch sử */}
                            {search.trim() === "" && history.length > 0 ? (
                                <div className="search-history-list">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400">Lịch sử tìm kiếm</span>
                                        <button
                                            className="text-sm text-red-500"
                                            onClick={() => clearHistory()}
                                        >
                                            Xóa lịch sử
                                        </button>
                                    </div>
                                    <ul className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                                        {history.map((term, idx) => (
                                            <li
                                                key={idx}
                                                className="p-2 hover:bg-gray-700 cursor-pointer rounded"
                                                onClick={() => handleSelectHistory(term)}
                                            >
                                                {term}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                // Nếu đã nhập thì hiển thị kết quả tìm kiếm
                                <div
                                    ref={resultsRef}
                                    className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
                                >
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
                                                addSearchTerm(movie.name); // Lưu tên phim khi click
                                            }}
                                        >
                                            <div className="flex size-12 flex-none items-center justify-center rounded-lg bg-gray-700">
                                                <img
                                                    src={"https://phimimg.com/" + movie.poster_url}
                                                    alt="image"
                                                    className="rounded"
                                                />
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
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}