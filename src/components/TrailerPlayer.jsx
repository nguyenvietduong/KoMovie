import React from "react";

export default function TrailerPlayer({ src, onClose }) {
    function convertToEmbedUrl(url) {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
        if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url;
    }

    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-lg border">
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
                    title="Đóng"
                >
                    ✕
                </button>

                <iframe
                    src={convertToEmbedUrl(src)}
                    title="Trailer phim"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                ></iframe>
            </div>
        </div>
    );
}
