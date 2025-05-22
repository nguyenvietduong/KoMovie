import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./TailwindCss.css";

import LoadingScreen from "./components/Loading/LoadingScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ListMoviePage from "./pages/ListMoviePage";
import NotFoundPage from "./pages/NotFoundPage";
import FallingEffect from "./components/FallingEffect";
import AIChatWidget from './components/AIChatWidget';
import MovieDetail from "./pages/MovieDetail";
import LoginPage from "./pages/Auth/LoginPage";
import MovieFavorites from "./pages/MovieFavorites";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubePage from "./pages/YouTubePage";
import RegisterPage from "./pages/Auth/RegisterPage";
// import SharedWatchRoomPage from "./pages/SharedWatchRoomPage";

export default function App() {
    const [selectedSrc, setSelectedSrc] = useState(null);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const pressedKeys = new Set();
        let alertedHD = false;

        const handleKeyDown = (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
                alert("Không được đâu lêu lêu !!");
                return;
            }

            pressedKeys.add(e.key.toLowerCase());

            if (pressedKeys.has("h") && pressedKeys.has("d") && !alertedHD) {
                alertedHD = true;
                alert("Lêu lêu Phạm Thị Thu Huyền 👀❤");
            }
        };

        const handleKeyUp = (e) => {
            pressedKeys.delete(e.key.toLowerCase());

            if (e.key.toLowerCase() === "h" || e.key.toLowerCase() === "d") {
                alertedHD = false;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <>
            <AIChatWidget />
            <FallingEffect effect="snowflakes" />
            <ToastContainer />
            <LoadingScreen />
            <Header />
            {selectedSrc && (
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
            )}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<ListMoviePage />} />
                <Route path="/movies/:movieSlug" element={<MovieDetail />} />
                {/* <Route path="/watch-room/:watchRoom/:movieSlug" element={<SharedWatchRoomPage />} /> */}
                <Route path="/movies-favorites" element={<MovieFavorites />} />
                {/* <Route path="/youtube" element={<YouTubePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};
