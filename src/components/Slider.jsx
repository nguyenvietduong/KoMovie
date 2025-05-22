import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TrailerPlayer from "./TrailerPlayer";
import { useState } from "react";

export default function Slider({ movies }) {
    const [trailerSrc, setTrailerSrc] = useState(null);

    return (
        <>
            <div className="w-full mx-auto overflow-hidden shadow">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    className="h-[600px]"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="relative w-full h-full min-h-[400px] md:min-h-[450px]">
                                {/* Background ảnh poster với blur và phóng to nhẹ */}
                                <img
                                    src={movie.poster_url}
                                    alt="Background"
                                    className="absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-transform duration-500 hover:scale-110"
                                />
                                {/* Overlay đen mờ để làm nổi phần nội dung */}
                                {/* Overlay đen mờ nhẹ hơn */}
                                <div className="absolute inset-0 bg-black bg-opacity-25 z-10"></div>

                                {/* Nội dung chính */}
                                <div className="relative z-20 flex flex-col md:flex-row h-full items-center justify-center px-6 md:px-20 gap-10">
                                    {/* Ảnh phim */}
                                    <div className="w-full md:w-1/2 flex justify-center">
                                        <img
                                            src={movie.poster_url}
                                            alt={movie.name}
                                            className="rounded-2xl shadow-2xl max-h-[320px] object-contain transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>

                                    {/* Thông tin phim */}
                                    <div
                                        className="
        w-full md:w-1/2 text-white text-center md:text-left
        bg-black bg-opacity-50
        backdrop-blur-lg
        rounded-xl
        p-8
        shadow-2xl
        border border-green-500/50
      "
                                    >
                                        <h2 className="text-3xl md:text-3xl font-bold mb-6 tracking-wider text-green-400 drop-shadow-lg">
                                            🎬 Đang chiếu rạp
                                        </h2>

                                        <h3 className="text-2xl md:text-2xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md">
                                            {movie.name}
                                        </h3>

                                        <p className="hidden md:block text-lg md:text-xl text-gray-200 opacity-90 mb-6 leading-relaxed max-w-3xl">
                                            {movie.origin_name || "Mô tả phim chưa có."}
                                        </p>

                                        <div className="flex flex-row md:flex-row gap-5 justify-center md:justify-start">
                                            <a
                                                href="https://www.lottecinemavn.com/LCHS/Contents/Movie/Movie-List.aspx"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
    relative overflow-hidden text-white px-8 border border-green-500 py-3 rounded-lg
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:via-green-400 before:to-green-600
    before:scale-x-0 before:origin-left before:transition-transform before:duration-400
    hover:before:scale-x-100
    hover:text-white
    before:z-0
    z-10
    font-semibold
    tracking-wide
    shadow-lg
    transition
    duration-300
  "
                                            >
                                                <span className="relative z-10">🍿 Mua vé ngay</span>
                                            </a>

                                                <button
                                                    onClick={() => setTrailerSrc(movie.trailer_url)}
                                                    className="
              relative overflow-hidden text-white px-8 border border-green-500 py-3 rounded-lg
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:via-green-400 before:to-green-600
              before:scale-x-0 before:origin-left before:transition-transform before:duration-400
              hover:before:scale-x-100
              hover:text-white
              before:z-0
              z-10
              font-semibold
              tracking-wide
              shadow-lg
              transition
              duration-300
            "
                                                >
                                                    <span className="relative z-10">📺 Xem Trailer</span>
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {trailerSrc && <TrailerPlayer src={trailerSrc} onClose={() => setTrailerSrc(null)} />}
        </>
    );
}
