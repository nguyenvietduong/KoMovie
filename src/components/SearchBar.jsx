import { useState, useEffect } from "react";

// Giả lập danh sách kết quả tìm kiếm
const mockResults = (query) => {
    if (!query) return [];
    return [
        `Kết quả cho: ${query}`,
        "Bài học về HTML",
        "Bài học về CSS",
        "Bài học về React",
    ];
};

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [results, setResults] = useState([]);

    // Debounce: đợi 2s sau khi người dùng ngừng nhập
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 2000);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Gọi "API" mỗi khi debouncedTerm thay đổi
    useEffect(() => {
        if (debouncedTerm.trim() === "") {
            setResults([]);
        } else {
            const fetched = mockResults(debouncedTerm);
            setResults(fetched);
        }
    }, [debouncedTerm]);

    return (
        <div className="relative max-w-md mx-auto">
            <form className="flex items-center border rounded overflow-hidden shadow-sm">
                <input
                    type="text"
                    placeholder="Tìm kiếm bài học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow px-4 py-1 outline-none"
                />
            </form>

            {/* Dropdown kết quả */}
            {results.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                    {results.map((item, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};