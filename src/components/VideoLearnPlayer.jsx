import React, { useState } from 'react';

export function VideoLearnPlayer({ videoUrls }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videoUrls.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
    };

    if (!videoUrls || videoUrls.length === 0) {
        return <div>No videos available to display</div>;
    }

    return (
        <div className="flex flex-col items-center mt-6">
            <div className="w-1/2 h-[350px] relative text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl blur-sm opacity-60"></div>

                <div className="relative z-10 rounded-xl overflow-hidden shadow-lg ring-1 ring-blue-200">
                    <iframe
                        className="w-full h-[350px]"
                        src={videoUrls[currentIndex]}
                        title={`Hangul Video Learn ${currentIndex + 1}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="mt-4 flex gap-4">
                <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={videoUrls.length === 1}
                    style={{ width: '100px' }}
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={videoUrls.length === 1}
                    style={{ width: '100px' }}
                >
                    Next
                </button>
            </div>

            <p className="mt-2 text-gray-600">
                Video {currentIndex + 1} / {videoUrls.length}
            </p>
        </div>
    );
}
