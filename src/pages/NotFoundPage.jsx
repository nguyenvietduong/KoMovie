import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

export default function NotFoundPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", to: "/" },
        { label: "404 Không tìm thấy", to: "/" }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            <div className="from-blue-50 to-white flex items-center justify-center px-4 py-12">
                <div className="text-center max-w-md">
                    <img
                        src="https://img.lovepik.com/png/20231030/Glitch-error-404-page-background-free-signal-failed_419616_wh1200.png"
                        alt="404 Không tìm thấy"
                        className="w-48 h-48 object-cover rounded-full shadow-lg mb-6 border-4 border-white mx-auto animate-spin-slow"
                    />

                    <p className="text-gray-700 mb-6 text-xl font-semibold">
                        Trang bạn tìm kiếm không tồn tại!
                    </p>
                    <p className="text-gray-700 mb-6">
                        Có thể địa chỉ bị sai hoặc trang đã bị xóa.
                    </p>

                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
                    >
                        Quay về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}
