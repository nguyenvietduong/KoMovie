import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useFavorites } from "../hooks/useFavorites";

export default function Nav() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { favorites } = useFavorites();

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    const navLinks = [
        { to: "/", label: "Trang chủ" },
        { to: "/movies", label: "Danh sách phim" },
        { to: "/movies-favorites", label: `Phim yêu thích (${favorites.length})` },
    ];

    return (
        <>
            {/* Dòng chữ nhỏ trên header */}
            <div className="absolute top-0 left-0 w-full text-white text-[10px] text-center py-1 select-none">
                Phạm Thị Thu Huyền <span className="heart-beat">❤</span> Nguyễn Viết Dương
            </div>
            <header className="shadow text-white" style={{ backgroundColor: "rgba(2, 2, 15, 0.36)", borderBottom: "1px solid rgba(2, 2, 15, 1)" }}>
                <nav
                    className="mx-auto max-w-7xl flex items-center justify-between p-6 pb-3 lg:px-8"
                    aria-label="Global"
                >
                    {/* Logo */}
                    <div className="flex lg:flex-1">
                        <Link to="/" className="relative -m-1.5 p-1.5 inline-block">
                            <span className="sr-only">KoLearn</span>

                            <div className="h-8 w-8 flex items-center justify-center animate-bounce text-2xl block sm:block">
                                <span className="animate-spin-slow inline-block">🌸</span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">
                                {mobileMenuOpen ? "Close main menu" : "Open main menu"}
                            </span>
                            {!mobileMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden lg:flex lg:gap-x-12 mx-12">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`text-sm font-semibold ${isActive(to)
                                    ? "text-green-600 underline"
                                    : "text-white hover:text-green-600"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}

                        <SearchBar />
                    </div>
                </nav>

                {/* Mobile menu panel */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white px-6 pt-2 pb-4 space-y-2 shadow-md">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${isActive(to)
                                    ? "bg-indigo-100 text-green-700"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-green-700"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}

                        <SearchBar />
                    </div>
                )}
            </header>
        </>
    );
}
