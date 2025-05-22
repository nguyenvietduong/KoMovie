import React from "react";

export default function VideoPlayerPopup({ selectedSrc, setSelectedSrc }) {
    const [isMinimized, setIsMinimized] = React.useState(false);

    if (!selectedSrc) return null;

    return (
        <div
            className={`fixed z-[9999] ${isMinimized
                    ? "bottom-4 right-4 w-72 aspect-video rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    : "inset-0 flex items-center justify-center bg-black bg-opacity-70"
                }`}
        >
            {!isMinimized ? (
                <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-lg border">
                    <button
                        onClick={() => {
                            setSelectedSrc(null);
                            setIsMinimized(false);
                        }}
                        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center z-10"
                        title="Đóng"
                    >
                        ✕
                    </button>

                    <button
                        onClick={() => setIsMinimized(true)}
                        className="absolute top-2 right-12 text-white bg-gray-600 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center z-10"
                        title="Thu nhỏ"
                    >
                        &#8211;
                    </button>

                    <iframe
                        src={selectedSrc}
                        title="Xem phim"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </div>
            ) : (
                <div
                    onClick={() => setIsMinimized(false)}
                    className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-lg"
                >
                    <iframe
                        src={selectedSrc}
                        title="Xem phim"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSrc(null);
                            setIsMinimized(false);
                        }}
                        className="absolute top-1 right-1 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center"
                        title="Đóng"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}
