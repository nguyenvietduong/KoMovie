import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../pages/Auth/AuthContext";
import SearchBar from "./SearchBar";
import { useFavorites } from "../hooks/useFavorites";
import { useUserContext } from "../hooks/UserContext";

export default function Header() {
    const { setUsername } = useUserContext();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const containerRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const { favorites } = useFavorites();
    const { username } = useUserContext();
    const [newName, setNewName] = useState("");


    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    const navLinks = [
        { to: "/", label: "Trang chủ" },
        { to: "/movies", label: "Danh sách phim" },
        { to: "/movies-favorites", label: `Phim yêu thích (${favorites.length})` },
        // { to: "/youtube", label: "Youtube" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setAuthMenuOpen(false);
                setShowInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

                        {/* Right side: Search, Language, User */}
                        <div className="hidden lg:flex lg:items-center lg:gap-x-6">

                            {username ? (
                                <div ref={containerRef} className="relative" onClick={() => setAuthMenuOpen(!authMenuOpen)}>
                                    <button type="button" className="flex items-center gap-x-1 text-sm/6 font-semibold text-white" aria-expanded="false">
                                        <span>👋 {username}</span>
                                        <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                    </button>

                                    {authMenuOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="absolute top-full -left-44 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                                <div className="p-4">
                                                    <Link to={"/watched"} className="group relative flex items-center gap-4 rounded-xl p-4 transition hover:bg-gray-100">
                                                        <div className="flex size-12 flex-none items-center justify-center rounded-xl bg-gray-100 group-hover:bg-white shadow-md">
                                                            <img
                                                                src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/499431860_1184152933444845_2540510630034471305_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=VliwfFudp4gQ7kNvwHcmnS2&_nc_oc=AdkeuuN7TWIhb0dL-HWzQzk0XYmeV1hzSADah3ikl7UmPNSPuJqb7Z6t70qffKBKoSiGXKjJ7xwwTaTNiUwxm_la&_nc_zt=24&_nc_ht=scontent.fhan15-1.fna&_nc_gid=Ssw0l9-CwfkDetjsISAhjw&oh=00_AfIrSpWONMKg3gAsBZGo4v1Kym6JPqOMB8866HTZeVh1lg&oe=68352242"
                                                                alt="Thumbnail"
                                                                className="h-10 w-10 rounded-md object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-base font-medium text-gray-800 group-hover:text-blue-600 transition">
                                                                Lịch sử xem
                                                            </h4>
                                                            <p className="text-sm text-gray-500">Lịch sử phim đã xem của bạn</p>
                                                        </div>
                                                    </Link>
                                                    {/* Hiển thị ô nhập nếu showInput true */}
                                                    {showInput && (
                                                        <div className="mt-3">
                                                            <input
                                                                type="text"
                                                                placeholder="Nhập tên mới"
                                                                value={newName === "" ? username : newName}
                                                                onChange={(e) => setNewName(e.target.value)}
                                                                className="w-full rounded-md border text-black border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                                    <button
                                                        onClick={() => {
                                                            if (showInput) {
                                                                if (newName.trim() === "") {
                                                                    alert("Vui lòng nhập tên trước khi tiếp tục!");
                                                                    return;
                                                                }
                                                                localStorage.setItem("username", newName.trim());
                                                                setNewName("");
                                                                setShowInput(false);
                                                                setAuthMenuOpen(false);
                                                                setUsername(newName.trim());
                                                            } else {
                                                                setShowInput(true);
                                                            }
                                                        }}
                                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                                                    >
                                                        {showInput ? "Lưu tên" : "Cập nhật tên"}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowInput(false);
                                                            setAuthMenuOpen(false);
                                                        }}
                                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                                                    >
                                                        Đóng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : ""}
                        </div>
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

                        {username ? (
                            <div className="pt-2 border-t border-gray-200">
                                <p className="py-2 font-medium text-gray-900">
                                    👋 {username}
                                </p>
                            </div>
                        ) : ""}
                    </div>
                )}
            </header>
        </>
    );
}
