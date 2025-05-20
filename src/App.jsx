import React, { useEffect, useState, useRef } from "react";
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
import MovieDetail from "./pages/MovieDetail";
import MovieFavorites from "./pages/MovieFavorites";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    // Vị trí thực tế của chuột
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    // Vị trí của vòng tròn di chuyển mượt
    const [pos, setPos] = useState({ x: -100, y: -100 });

    // Dùng ref lưu id của animation frame để hủy khi unmount
    const animationFrameId = useRef(null);

    const pressedKeys = useRef(new Set());
    const alertedHD = useRef(false);

    // Cập nhật vị trí chuột khi di chuyển
    useEffect(() => {
        const moveCursor = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    // Animation loop để làm mượt vòng tròn di chuyển theo chuột
    useEffect(() => {
        const animate = () => {
            setPos((prev) => {
                const dx = mousePos.x - prev.x;
                const dy = mousePos.y - prev.y;
                const speed = 1.1; // tốc độ di chuyển (giảm xuống thì chậm và mượt hơn)

                if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                    return prev;
                }
                return {
                    x: prev.x + dx * speed,
                    y: prev.y + dy * speed,
                };
            });
            animationFrameId.current = requestAnimationFrame(animate);
        };

        animationFrameId.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [mousePos]);

    // Xử lý phím bấm với alert
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
                alert("Không được đâu lêu lêu !!");
                return;
            }

            pressedKeys.current.add(e.key.toLowerCase());

            if (
                pressedKeys.current.has("h") &&
                pressedKeys.current.has("d") &&
                !alertedHD.current
            ) {
                alertedHD.current = true;
                alert("Lêu lêu Phạm Thị Thu Huyền 👀❤");
            }
        };

        const handleKeyUp = (e) => {
            pressedKeys.current.delete(e.key.toLowerCase());
            if (e.key.toLowerCase() === "h" || e.key.toLowerCase() === "d") {
                alertedHD.current = false;
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
            <div
                className="cursor-circle"
                style={{ left: pos.x + "px", top: pos.y + "px" }}
            />
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
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
}
