import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export default function MovieFavorites() {
    const { favorites, toggleFavorite } = useFavorites();

    const breadcrumbItems = [
        { label: "Trang chủ", to: "/" },
        { label: "Phim yêu thích", to: "/favorites" },
    ];

    const getFullThumbUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("https://phimimg.com")) {
            return url;
        }
        return `https://phimimg.com/${url}`;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="text-3xl font-bold text-center text-white mb-6">🎬 Phim yêu thích của bạn</h2>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mb-4 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                    </svg>
                    <p className="text-lg font-medium text-white">Bạn chưa có phim yêu thích nào.</p>
                    <Link
                        to="/"
                        className="mt-4 inline-block px-6 py-2 border-[3px] border-green-600 text-white rounded-full hover:bg-green-600 transition"
                    >
                        Về trang chủ để chọn phim
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {favorites.slice().map((movie) => (
                        <div key={movie.slug} className="relative group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
                            <button
                                onClick={() => toggleFavorite(movie)}
                                className="absolute top-2 right-2 z-20 bg-white rounded-full w-[25px] p-1 shadow hover:bg-pink-100 transition text-pink-600"
                                title="Xóa khỏi yêu thích"
                                aria-label={`Xóa phim ${movie.name} khỏi yêu thích`}
                            >
                                ×
                            </button>

                            <Link
                                to={`/movies/${movie.slug}`}
                                className="block overflow-hidden"
                            >
                                <img
                                    src={getFullThumbUrl(movie.thumb_url)}
                                    alt={movie.name}
                                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-blue-700 truncate">
                                        {movie.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">{movie.origin_name}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
