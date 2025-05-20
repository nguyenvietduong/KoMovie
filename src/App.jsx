import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./TailwindCss.css";

import LoadingScreen from "./components/Loading/LoadingScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ListMoviePage from "./pages/ListMoviePage";
import LoginPage from "./pages/Auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import FallingEffect from "./components/FallingEffect";
import MovieDetail from "./pages/MovieDetail";
import MovieFavorites from "./pages/MovieFavorites";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    useEffect(() => {
        const pressedKeys = new Set();

        const handleKeyDown = (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
                alert("Không được đâu lêu lêu !!");
                return;
            }

            // Thêm phím đang nhấn vào Set
            pressedKeys.add(e.key.toLowerCase());

            // Kiểm tra nếu đang nhấn cả "h" và "d"
            if (pressedKeys.has("h") && pressedKeys.has("d")) {
                alert("Lêu lêu Phạm Thị Thu Huyền 👀❤");
            }
        };

        const handleKeyUp = (e) => {
            pressedKeys.delete(e.key.toLowerCase());
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
            <FallingEffect effect="snowflakes" />
            <ToastContainer />
            <ScrollToTopButton />
            <LoadingScreen />
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<ListMoviePage />} />
                <Route path="/movies/:movieSlug" element={<MovieDetail />} />
                <Route path="/movies-favorites" element={<MovieFavorites />} />

                {/* <Route path="/login" element={<LoginPage />} /> */}
                <Route path="*" element={<NotFoundPage />} /> {/* ✅ route 404 */}
            </Routes>
            <Footer />
        </>
    );
};
