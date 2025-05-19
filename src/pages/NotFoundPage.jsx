import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../components/Breadcrumb";

export default function NotFoundPage() {
    const { t } = useTranslation();

    const breadcrumbItems = [
        { label: t("nav.home"), path: "/" },
        { label: t("nav.error.404.title"), path: "/" }
    ];

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb items={breadcrumbItems} />
                <div className="from-blue-50 to-white flex items-center justify-center px-4 py-12">
                <div className="text-center max-w-md">
                    {/* Ảnh nền liên quan Hàn Quốc */}
                    <img
                        src="https://img.lovepik.com/png/20231030/Glitch-error-404-page-background-free-signal-failed_419616_wh1200.png"
                        alt="404 Korea"
                        className="w-48 h-48 object-cover rounded-full shadow-lg mb-6 border-4 border-white mx-auto animate-spin-slow"
                    />

                    {/* Mã lỗi */}
                    <p className="text-gray-700 mb-6">
                        {t("pages.error.404.title")}
                    </p>
                    <p className="text-gray-700 mb-6">
                        {t("pages.error.404.desc")}
                    </p>

                    {/* Nút quay về */}
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
                    >
                        {t("pages.error.404.back")}
                    </Link>
                </div>
            </div>
            </div>
        </>
    );
};