import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        try {
            if (storedToken && storedUser !== "undefined") {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } else {
                // Dọn sạch nếu lỗi
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } catch (err) {
            console.error("Lỗi khi parse dữ liệu user:", err);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, []);

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);

        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            toast.success("Đăng nhập thành công!");
        } else {
            toast.error("Không thể lưu thông tin đăng nhập vào localStorage.");
        }
    };

    const register = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);

        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            toast.success("Đăng ký thành công!");
        } else {
            toast.error("Không thể lưu thông tin đăng ký vào localStorage.");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
