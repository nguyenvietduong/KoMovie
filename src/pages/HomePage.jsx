import Breadcrumb from "../components/Breadcrumb";
import Slider from "../components/Slider";
import MovieSection from "../components/Movie/MovieSection";
import MovieTabs from "../components/Movie/MovieTabs";
import { useEffect, useState } from "react";
import movieService from '../services/MovieService';

export default function HomePage() {
    const breadcrumbItems = [{ label: "Trang chủ", path: "/" }];

    const [dataSliderMovies, setDataSliderMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [hotMovies, setHotMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function randum() {
        return Math.floor(Math.random() * 10) + 1;
    }

    useEffect(() => {
        const fetchSliderAndNewMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchRandom = () => movieService.fetchNewMovies(randum());

                const [sliderRes, newMoviesRes] = await Promise.all([
                    fetchRandom(),
                    fetchRandom()
                ]);

                setDataSliderMovies(sliderRes.items || []);
                setNewMovies(newMoviesRes.items || []);
            } catch (err) {
                console.error(err);
                setError("Không thể tải phim mới");
            } finally {
                setLoading(false);
            }
        };

        fetchSliderAndNewMovies();
    }, []);

    useEffect(() => {
        const fetchHotMovies = async () => {
            try {
                const hotRes = await movieService.fetchNewMovies(randum());
                setHotMovies(hotRes.items || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHotMovies();
    }, []);

    return (
        <>
            <Slider movies={dataSliderMovies} />

            <div className="container mx-auto px-4 py-10 space-y-16">
                <Breadcrumb items={breadcrumbItems} />

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
                    Chào mừng đến với KoMovie - Thế Giới Giải Trí Trong Tầm Tay!
                </h2>

                {loading && <p>Đang tải phim mới...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {!loading && !error && (
                    <MovieSection title="| Phim Mới Cập Nhật" movies={newMovies} linkTo="/movies?type=phim-moi" />
                )}

                <MovieSection title="| Top Phim Đang Hot" movies={hotMovies} linkTo="/movies?type=phim-hot" />

                <MovieTabs />
            </div>
        </>
    );
}
