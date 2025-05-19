import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function KoreanLoading() {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => setIsVisible(false), 1500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* <motion.div
                        className="text-4xl font-bold text-gray-800 mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        KoLearn
                    </motion.div> */}

                    {/* Taegeuk symbol */}
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        className="w-24 h-24"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    >
                        <circle cx="50" cy="50" r="45" fill="#fff" stroke="#000" strokeWidth="2" />
                        <path
                            d="M50 5a45 45 0 1 0 0 90a22.5 22.5 0 1 1 0-45z"
                            fill="#0047A0" // xanh dương
                        />
                        <path
                            d="M50 95a45 45 0 0 0 0-90a22.5 22.5 0 0 1 0 45z"
                            fill="#D80027" // đỏ
                        />
                    </motion.svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
