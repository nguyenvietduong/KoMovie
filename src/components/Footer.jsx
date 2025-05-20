export default function Footer() {
    return (
        <footer className="text-gray-700 py-8" style={{ backgroundColor: "rgba(2, 2, 15, 0.36)", borderTop: "1px solid rgba(2, 2, 15, 1)" }}>
            <div className="container mx-auto px-4 text-center space-y-3 sm:space-y-4">
                <p
                    className="font-semibold text-base sm:text-lg md:text-xl text-white"
                    id="footer-title"
                >
                    🎬 Thế Giới Phim Mới Nhất
                </p>

                <p className="text-sm sm:text-base text-white max-w-xl mx-auto">
                    Cập nhật liên tục các bộ phim hot, đa dạng thể loại từ hành động, phiêu lưu, đến hoạt hình và drama. Đem đến cho bạn trải nghiệm xem phim trực tuyến chất lượng và hấp dẫn nhất.
                </p>

                <p className="text-xs sm:text-sm text-white mt-6" id="footer-contact">
                    © 2025 Kênh Phim Online — Liên hệ: duongnv10504@gmail.com
                </p>
            </div>
        </footer>
    );
}