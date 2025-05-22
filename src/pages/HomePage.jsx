import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Breadcrumb from "../components/Breadcrumb";
import Slider from "../components/Slider";
import MovieSection from "../components/Movie/MovieSection";
import MovieTabs from "../components/Movie/MovieTabs";
import movieService from "../services/MovieService";
import movies from "../config/movies";

export default function HomePage() {
    const breadcrumbItems = [{ label: "Trang chủ", path: "/" }];
    const showingMovies = movies.filter((movie) => movie.isShowing);

    const [newMovies, setNewMovies] = useState([]);
    const [hotMovies, setHotMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const randum = () => Math.floor(Math.random() * 10) + 1;

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const [newMoviesRes, hotRes] = await Promise.all([
                    movieService.fetchNewMovies(randum()),
                    movieService.fetchNewMovies(randum()),
                ]);
                setNewMovies(newMoviesRes.items || []);
                setHotMovies(hotRes.items || []);
            } catch (err) {
                console.error(err);
                setError("Đã xảy ra lỗi khi tải phim mới.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <>
            <Helmet>
                <title>Xem phim miễn phí chất lượng cao | KoMovie</title>
            </Helmet>

            <Slider movies={showingMovies} />

            <div className="container mx-auto px-4 py-10 space-y-16">
                <Breadcrumb items={breadcrumbItems} />

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
                    Chào mừng đến với KoMovie - Thế Giới Giải Trí Trong Tầm Tay!
                </h2>

                {loading && <p>Đang tải phim mới...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {!loading && !error && (
                    <MovieSection
                        title="| Phim Mới Cập Nhật"
                        movies={newMovies}
                        linkTo="/movies?type=phim-moi"
                    />
                )}

                <MovieSection
                    title="| Top Phim Đang Hot"
                    movies={hotMovies}
                    linkTo="/movies?type=phim-hot"
                />

                <MovieTabs />
            </div>
        </>
    );
}
