import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import AuthService from "../../services/AuthService";
import { Helmet } from "react-helmet";

export default function RegisterPage() {
    const navigate = useNavigate();
    const authService = new AuthService();
    const { user, register } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        if (password !== confirmPassword) {
            setErrorMsg("Mật khẩu xác nhận không khớp.");
            setLoading(false);
            return;
        }

        try {
            const data = await authService.register(name, email, password, confirmPassword);
            register(data.user, data.token);
            navigate("/");
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            setErrorMsg(error.response?.data?.message || "Đăng ký thất bại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Đăng ký tài khoản | KoMovie</title>
            </Helmet>

            <div className="mx-auto my-[90px] flex w-[600px] flex-col rounded-2xl border border-gray-700 bg-[#1f1f1f] px-12 py-10 text-white shadow-2xl"
                style={{ backgroundImage: "url('https://tfhtml.themepul.com/moviestar/images/slider/home-1/slider-2.jpg')" }}>
                <div className="mb-8 flex items-center space-x-3">
                    <div className="h-6 w-1 rounded-full bg-[#0DE6AC]"></div>
                    <h1 className="text-3xl font-bold tracking-wide text-white">Đăng ký</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <input
                        className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3 placeholder-gray-400 outline-none focus:border-[#0DE6AC] focus:ring-1 focus:ring-[#0DE6AC]"
                        type="text"
                        placeholder="Họ và tên"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3 placeholder-gray-400 outline-none focus:border-[#0DE6AC] focus:ring-1 focus:ring-[#0DE6AC]"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3 placeholder-gray-400 outline-none focus:border-[#0DE6AC] focus:ring-1 focus:ring-[#0DE6AC]"
                        type="password"
                        placeholder="Mật khẩu"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="w-full rounded-md border border-gray-600 bg-transparent px-5 py-3 placeholder-gray-400 outline-none focus:border-[#0DE6AC] focus:ring-1 focus:ring-[#0DE6AC]"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {errorMsg && (
                        <div className="text-red-400 text-sm font-medium">{errorMsg}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-[#0DE6AC] py-3 font-semibold text-black text-lg transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>

                <div className="mt-6 flex justify-between text-sm text-gray-400">
                    <a href="/login" className="underline underline-offset-2 hover:text-[#0DE6AC]">Đã có tài khoản? Đăng nhập</a>
                </div>
            </div>
        </>

    );
}
