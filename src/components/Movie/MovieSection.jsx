import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function MovieSection({ title, movies, linkTo }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-blue-600">{title}</h3>
                {linkTo && (
                    <Link to={linkTo} className="text-pink-500 hover:underline text-sm">
                        Xem tất cả →
                    </Link>
                )}
            </div>

            {/* Slider */}
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
                    // Gán thủ công sau khi Swiper khởi tạo
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                            <img
                                src={movie.thumb_url}
                                alt={movie.name}
                                className="w-full max-w-full rounded-lg shadow-lg object-cover aspect-video transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4">
                                <h4
                                    className="text-lg font-semibold mb-2 text-center truncate"
                                    style={{ maxWidth: '200px', margin: '0 auto' }}
                                >
                                    {movie.name}
                                </h4>
                                <p
                                    className="text-sm text-center mb-4 truncate"
                                    style={{ maxWidth: '200px', margin: '0 auto' }}
                                >
                                    {movie.origin_name}
                                </p>
                                <Link
                                    to={`/movies/${movie.slug}`}
                                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 mt-4 py-2 rounded-full text-sm transition"
                                >
                                    🎬 Xem
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Nút Prev & Next */}
            <div ref={prevRef} className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 cursor-pointer">
                <button className="bg-white shadow p-2 rounded-full hover:bg-gray-200">◀</button>
            </div>
            <div ref={nextRef} className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 cursor-pointer">
                <button className="bg-white shadow p-2 rounded-full hover:bg-gray-200">▶</button>
            </div>
        </section>
    );
}
