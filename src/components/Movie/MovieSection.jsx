import { Link } from "react-router-dom";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useFavorites } from "../../hooks/useFavorites";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function MovieSection({ title, movies, linkTo }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const { favorites, toggleFavorite } = useFavorites();

    return (
        <section className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                {linkTo && (
                    <Link to={linkTo} className="text-white hover:underline text-sm">
                        Xem tất cả →
                    </Link>
                )}
            </div>

            <Swiper
                spaceBetween={15}
                slidesPerView={1.2}
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    768: { slidesPerView: 3.2 },
                    1024: { slidesPerView: 4 },
                }}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {movies.map((movie, index) => {
                    const isFavorite = Array.isArray(favorites) && favorites.some(fav => fav.slug === movie.slug);

                    return (
                        <SwiperSlide key={index}>
                            <div className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                                <img
                                    src={movie.thumb_url}
                                    alt={movie.name}
                                    className="w-full max-w-full rounded-lg shadow-lg object-cover aspect-video transition-transform duration-300 hover:scale-105"
                                />

                                {/* Nút yêu thích góc trên phải */}
                                <button
                                    onClick={() => toggleFavorite(movie)}
                                    className="absolute top-2 right-2 z-20 p-1 rounded-full focus:outline-none"
                                    title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                    aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                                >
                                    {isFavorite ? (
                                        // Trái tim đỏ (filled)
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
                                        // Trái tim trắng (outline)
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

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4">
                                    <h4
                                        className="text-lg font-semibold mb-2 text-center truncate"
                                        style={{ maxWidth: "200px", margin: "0 auto" }}
                                    >
                                        {movie.name}
                                    </h4>
                                    <p
                                        className="text-sm text-center mb-4 truncate"
                                        style={{ maxWidth: "200px", margin: "0 auto" }}
                                    >
                                        {movie.origin_name}
                                    </p>
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
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div
                ref={prevRef}
                className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 cursor-pointer"
            >
                <button className="bg-white shadow p-2 w-[50px] h-[50px] rounded-full hover:bg-green-600">◀</button>
            </div>
            <div
                ref={nextRef}
                className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 cursor-pointer"
            >
                <button className="bg-white shadow p-2 w-[50px] h-[50px] rounded-full hover:bg-green-600">▶</button>
            </div>
        </section>
    );
}
