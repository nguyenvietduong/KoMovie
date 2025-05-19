import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Slider({ movies }) {

    return (
        <div className="w-full mx-auto overflow-hidden shadow">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000 }}
                loop={true}
                pagination={{ clickable: true }}
                className="h-[550px]"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={movie.thumb_url}
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 z-10"></div>

                            <div className="relative z-20 flex flex-col md:flex-row h-full items-center justify-center px-6 md:px-20 gap-8">
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <img
                                        src={movie.thumb_url}
                                        alt={movie.name}
                                        className="rounded-xl shadow-lg max-h-[300px] object-contain"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 text-white text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{movie.name}</h3>
                                    <p className="text-md md:text-lg opacity-90 mb-4">
                                        {movie.origin_name || "Mô tả phim chưa có."}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                        <Link
                                            to={`/movies/${movie.slug}.html`}
                                            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 text-pink-700 font-semibold shadow-md hover:shadow-lg hover:from-pink-400 hover:to-pink-400 transition-all duration-300 flex items-center gap-2 justify-center"
                                        >
                                            ▶️ <span className="text-lg">Xem Ngay</span>
                                        </Link>
                                        {movie.trailerUrl && (
                                            <a
                                                href={movie.trailerUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-2 rounded-full bg-gray-200 text-pink-600 hover:bg-gray-300 transition"
                                            >
                                                🎬 Trailer
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
