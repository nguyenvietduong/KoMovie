import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import AuthService from "../../services/AuthService";
import { Helmet } from "react-helmet";

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
        <>
            <Helmet>
                <title>Đăng nhập tài khoản | KoMovie</title>
            </Helmet>

            <div
                className="mx-auto my-36 flex w-[600px] flex-col rounded-2xl border border-gray-700 bg-[#1f1f1f] px-12 py-10 text-white shadow-2xl"
                style={{ backgroundImage: "url('https://tfhtml.themepul.com/moviestar/images/slider/home-1/slider-2.jpg')" }}
            >
                {/* Header */}
                <div className="mb-8 flex items-center space-x-3">
                    <div className="h-6 w-1 rounded-full bg-[#0DE6AC]"></div>
                    <h1 className="text-3xl font-bold tracking-wide text-white">Đăng nhập</h1>
                </div>

                {/* Input Fields */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <input
                        className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3 text-base placeholder-gray-400 outline-none transition focus:border-[#0DE6AC] focus:ring-1 focus:ring-[#0DE6AC]"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3 text-base placeholder-gray-400 outline-none transition focus:border-[#0DE6AC] focus:ring-1 focus:ring-[#0DE6AC]"
                        type="password"
                        placeholder="Mật khẩu"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="text-red-400 text-sm font-medium">{errorMsg}</div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-[#0DE6AC] py-3 font-semibold text-black text-lg transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-6 flex justify-between text-sm text-gray-400">
                    <button type="button" className="hover:text-[#0DE6AC]">Quên mật khẩu?</button>
                    <a href="/register" className="underline underline-offset-2 hover:text-[#0DE6AC]">Đăng ký ngay</a>
                </div>
            </div>
        </>

    );
}
