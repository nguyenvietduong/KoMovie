import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem("favorites");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        setFavorites((prev) => {
            const current = Array.isArray(prev) ? prev : [];
            const exists = current.some((item) => item.slug === movie.slug);
            if (exists) {
                toast.success(`Xóa phim khỏi danh sách yêu thích!`);

                return current.filter((item) => item.slug !== movie.slug);
            } else {
                toast.success("Thêm vào yêu thích thành công!");

                return [movie, ...current];
            }
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
