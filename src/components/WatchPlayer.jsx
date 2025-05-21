import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WatchPlayer({ src, onClose }) {
    if (!src) return null;

    const handleBackgroundClick = (e) => {
        // Đảm bảo không đóng khi click vào nội dung iframe
        if (e.target.id === "watch-player-backdrop") {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                id="watch-player-backdrop"
                className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center"
                onClick={handleBackgroundClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-xl border"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
                        title="Đóng video"
                        aria-label="Đóng video"
                    >
                        ✕
                    </button>

                    <iframe
                        src={src}
                        title="YouTube Player"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
