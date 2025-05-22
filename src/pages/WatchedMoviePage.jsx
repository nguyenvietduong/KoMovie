import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";

export default function WatchedMoviePage() {
    const [watchedMovies, setWatchedMovies] = useState([]);

    const breadcrumbItems = [
        { label: "Trang chủ", to: "/" },
        { label: "Lịch sử xem", to: "/watched" },
    ];

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("watchedMovies") || "[]");
        setWatchedMovies(stored);
    }, []);

    return (
        <>
            <Helmet>
                <title>Phim đã xem | KoMovie</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <Breadcrumb items={breadcrumbItems} />

                <h2 className="text-3xl font-bold text-center text-white mb-6">📽️ Phim bạn đã xem</h2>

                {watchedMovies.length === 0 ? (
                    <p className="text-white text-center">Bạn chưa xem phim nào.</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {watchedMovies.map((movie, idx) => (
                            <div key={movie.slug} className="relative group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
                                <Link
                                    to={`/movie/${movie.slug}`}
                                    key={idx}
                                    className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 hover:shadow-xl transition min-h-[480px]"
                                >
                                    <img
                                        src={movie.poster_url}
                                        alt={movie.name}
                                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-blue-700 truncate">
                                            {movie.name}
                                        </h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
