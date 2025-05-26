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
import VideoPlayerPopup from './components/VideoPlayerPopup';
import MovieDetail from "./pages/MovieDetail";
import LoginPage from "./pages/Auth/LoginPage";
import MovieFavorites from "./pages/MovieFavorites";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubePage from "./pages/YouTubePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import FallingGiftBox from "./components/FallingGiftBox";
import UserNamePrompt from "./components/UserNamePrompt";
import WatchedMoviePage from "./pages/WatchedMoviePage";
// import SharedWatchRoomPage from "./pages/SharedWatchRoomPage";

export default function App() {
    const [selectedSrc, setSelectedSrc] = React.useState(null);

    useEffect(() => {
        const pressedKeys = new Set();
        let alertedHD = false;

        const handleKeyDown = (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
                alert("Error !!");
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
            <UserNamePrompt />
            <AIChatWidget />
            <FallingEffect effect="snowflakes" />
            <FallingGiftBox />
            <ToastContainer />
            <LoadingScreen />
            <Header />
            <VideoPlayerPopup selectedSrc={selectedSrc} setSelectedSrc={setSelectedSrc} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<ListMoviePage />} />
                <Route path="/movies/:movieSlug" element={<MovieDetail />} />
                {/* <Route path="/watch-room/:watchRoom/:movieSlug" element={<SharedWatchRoomPage />} /> */}
                <Route path="/movies-favorites" element={<MovieFavorites />} />
                <Route path="/watched" element={<WatchedMoviePage />} />
                {/* <Route path="/youtube" element={<YouTubePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};
