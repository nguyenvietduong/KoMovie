import React, { useEffect, useState } from "react";
import { useUserContext } from "../hooks/UserContext";

export default function UserNamePrompt() {
    const { setUsername } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (!storedName) {
            setShowModal(true);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = () => {
        if (name.trim()) {
            localStorage.setItem("username", name.trim());
            setUsername(name.trim());
            setShowModal(false);
            document.body.style.overflow = "auto";
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in"
                style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/dark-stained-rusty-grunge-building-spooky-abandoned-ruined-generative-ai_188544-12726.jpg")' }}
            >
                <h2 className="text-2xl font-bold mb-3 text-white">👋 Chào bạn!</h2>
                <p className="mb-5 text-white">Vui lòng nhập tên của bạn để bắt đầu:</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên của bạn..."
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                    🚀 Bắt đầu
                </button>
            </div>
        </div>
    );
}
