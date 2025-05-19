import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../pages/Auth/AuthContext";

export default function Nav() {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [authMenuOpen, setAuthMenuOpen] = useState(false);

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    const navLinks = [
        { to: "/", label: "Trang chủ" },
        { to: "/movies", label: "Danh sách phim" },
    ];

    return (
        <>
            {/* Dòng chữ nhỏ trên header */}
            <div className="absolute top-0 left-0 w-full bg-gray-100 text-gray-600 text-xs text-center py-1 select-none">
                Phạm Thị Thu Huyền - Nguyễn Viết Dương
            </div>
            <header className="bg-white shadow">
                <nav
                    className="mx-auto max-w-7xl flex items-center justify-between p-6 lg:px-8"
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
                                    ? "text-indigo-600 underline"
                                    : "text-gray-900 hover:text-indigo-600"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side: Search, Language, User */}
                    {/* <div className="hidden lg:flex lg:items-center lg:gap-x-6">

                        {user ? (
                            <div className="relative" onClick={() => setAuthMenuOpen(!authMenuOpen)}>
                                <button type="button" class="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900" aria-expanded="false">
                                    <span>👋 {user.name || user.email}</span>
                                    <svg class="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                    </svg>
                                </button>

                                {authMenuOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div class="absolute top-full -left-44 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                            <div class="p-4">
                                                <div class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
                                                    <div class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                        <img src="data:image/jpeg;base64,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" alt="" />
                                                    </div>
                                                    <div class="flex-auto">
                                                        <a href="#" class="block font-semibold text-gray-900">
                                                            {user.name && <p className="mb-2 font-semibold">{user.name}</p>}
                                                            <span class="absolute inset-0"></span>
                                                        </a>
                                                        <p class="mt-1 text-gray-600">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                                <button onClick={() => {
                                                    logout();
                                                    setAuthMenuOpen(false);
                                                }} class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100">
                                                    Đăng xuất
                                                </button>
                                                <button onClick={() => setAuthMenuOpen(false)} class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100">
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ${isActive("/login") ? "ring-2 ring-indigo-600" : ""
                                    }`}
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div> */}
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
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}

                        {/* {user ? (
                            <div className="pt-2 border-t border-gray-200">
                                <p className="py-2 font-medium text-gray-900">
                                    👋 {user.name || user.email}
                                </p>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full rounded-md bg-red-600 py-2 mt-2 text-white hover:bg-red-700 transition"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${isActive("/login")
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                                    }`}
                            >
                                Đăng nhập
                            </Link>
                        )} */}
                    </div>
                )}
            </header>
        </>
    );
}
