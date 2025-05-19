import React from "react";

export default function WatchPlayer({ src, onClose }) {
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-lg border">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
                    title="Đóng"
                >
                    ✕
                </button>

                <iframe
                    src={src}
                    title="Xem phim"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                ></iframe>
            </div>
        </div>
    );
}
