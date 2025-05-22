import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

export default function FallingGiftBox() {
    const [showBox, setShowBox] = useState(false);
    const [message, setMessage] = useState("");
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const messages = [
        "🎉 Chúc bạn xem phim vui vẻ!",
        "🍿 Hy vọng bạn có những phút giây giải trí tuyệt vời!",
        "🎬 Phim hay đang chờ bạn khám phá!",
        "✨ Đắm chìm trong thế giới phim ảnh!",
        "🌟 Chúc bạn có những trải nghiệm xem phim tuyệt vời!",
        "🎥 Đừng quên bỏng ngô và thư giãn nhé!",
        "💫 Xem phim vui vẻ và tận hưởng thời gian!",
        "🎭 Mọi cảm xúc đều sẽ được đánh thức!",
        "🌈 Hãy để phim ảnh mang bạn đến những chân trời mới!",
        "🔥 Top phim hot đang chờ bạn xem!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setShowBox(true);
            setMessage("");
            setClicked(false);
        }, 10 * 60 * 1000); // 1 phút

        setShowBox(true);

        return () => clearInterval(interval);
    }, []);

    const getRandomMessage = () => {
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setShowBox(false);
            setMessage(getRandomMessage());
        }, 700);
    };

    // Tự động ẩn message sau 3 giây
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <>
            <AnimatePresence>
                {showBox && (
                    <motion.div
                        initial={{ top: 0, opacity: 0 }}
                        animate={{ top: "calc(100vh - 160px)", opacity: 1 }}
                        exit={{ top: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 15, duration: 2 }}
                        onClick={handleClick}
                        style={{ position: "fixed", left: 40, cursor: "pointer", zIndex: 9999 }}
                    >
                        <div
                            className="relative inline-block"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <span
                                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs rounded w-[90px] px-2 py-1 pointer-events-none transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                Mở quà ngay
                            </span>

                            <motion.div
                                animate={clicked ? { x: 0 } : { x: [-5, 5, -5] }}
                                transition={
                                    clicked
                                        ? { duration: 0.5 }
                                        : { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
                                }
                                className="bg-yellow-400 p-4 rounded-full shadow-lg hover:scale-110 hover:bg-green-600 transition-transform cursor-pointer"
                            >
                                <Gift className="text-white w-10 h-10" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {message && (
                    <motion.div
                        key="message-modal-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90"
                    >
                        <motion.div
                            key="message-modal"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="bg-black bg-opacity-90 text-white px-10 py-6 rounded-xl shadow-xl text-2xl font-semibold select-none"
                        >
                            {message}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}