import { createContext, useContext, useState, useEffect } from "react";

const SearchHistoryContext = createContext();

export function SearchHistoryProvider({ children }) {
    // Khởi tạo từ localStorage, mặc định là mảng rỗng
    const [history, setHistory] = useState(() => {
        try {
            const stored = localStorage.getItem("searchHistory");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Cập nhật localStorage mỗi khi history thay đổi
    useEffect(() => {
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }, [history]);

    // Thêm một từ khóa vào lịch sử
    const addSearchTerm = (term) => {
        setHistory((prev) => {
            // Loại bỏ trùng lặp
            const filtered = prev.filter(item => item !== term);
            // Giới hạn số lượng lưu, ví dụ tối đa 20
            const newHistory = [term, ...filtered].slice(0, 20);
            return newHistory;
        });
    };

    // Xóa một từ khóa trong lịch sử
    const removeSearchTerm = (term) => {
        setHistory((prev) => prev.filter(item => item !== term));
    };

    // Xóa toàn bộ lịch sử tìm kiếm
    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <SearchHistoryContext.Provider
            value={{ history, addSearchTerm, removeSearchTerm, clearHistory }}
        >
            {children}
        </SearchHistoryContext.Provider>
    );
}

export function useSearchHistory() {
    return useContext(SearchHistoryContext);
}
