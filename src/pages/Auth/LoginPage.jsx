import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import AuthService from "../../services/AuthService";

export default function LoginPage() {
    const navigate = useNavigate();
    const authService = new AuthService();
    const { user, login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const data = await authService.login(email, password);
            login(data.user, data.token);
            navigate("/");
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            setErrorMsg(error.message || "Đăng nhập thất bại, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage: `url("https://booking.pystravel.vn/uploads/posts/albums/7273/4aec29afd22d6783dcee8a070398e39a.png")`,
            }}
        >
            <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-xl p-6 sm:p-10 w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-blue-800">
                        Đăng nhập
                    </h1>
                    <p className="text-blue-600 font-medium mt-1">
                        Vui lòng đăng nhập để tiếp tục
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-blue-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập email của bạn"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-blue-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    {errorMsg && (
                        <div className="text-red-600 text-sm font-medium">{errorMsg}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                <div className="text-center text-sm text-blue-600 mt-4">
                    Chưa có tài khoản?{" "}
                    <a
                        href="/register"
                        className="font-semibold underline hover:text-blue-800"
                    >
                        Đăng ký ngay
                    </a>
                </div>
            </div>
        </div>
    );
}
