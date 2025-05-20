import React, { useState, useEffect, useRef } from 'react';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatBoxRef = useRef(null); // tham chiếu đến hộp chat

    // Cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Đóng modal khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const extractTextFromContent = (content) => {
        if (!content) return '';
        if (Array.isArray(content.parts)) {
            return content.parts.map(part => part.text).join('');
        }
        if (typeof content === 'string') return content;
        return '';
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmbyGQfA3Mkg2rxnYMnUGFKoy4KkloPgQ',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: input }] }],
                    }),
                }
            );

            const data = await res.json();
            const rawContent = data?.candidates?.[0]?.content;
            const replyText = extractTextFromContent(rawContent) || 'Không có phản hồi';

            setMessages([...newMessages, { role: 'assistant', content: replyText }]);
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: '⚠️ Lỗi khi gọi API' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Nút mở chat */}
            <button
                aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
                className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl z-50 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                💬
            </button>

            {/* Hộp chat */}
            {isOpen && (
                <div
                    ref={chatBoxRef}
                    className="fixed bottom-20 right-5 w-80 h-[450px] bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 flex flex-col z-50 overflow-hidden font-sans"
                >
                    {/* Header */}
                    <div className="bg-green-600 p-3 font-semibold text-lg text-center select-none">
                        KoMovie AI Chat - Hỗ trợ phim
                    </div>

                    {/* Nội dung chat */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {messages.length === 0 && (
                            <div className="text-gray-400 italic text-center">
                                Chào bạn! Nhập câu hỏi liên quan phim để mình giúp nhé.
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[75%] px-4 py-2 rounded-xl break-words whitespace-pre-line
                  ${msg.role === 'user' ? 'bg-red-600 ml-auto text-white' : 'bg-gray-800 mr-auto text-gray-200'}
                `}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-gray-400 italic">AI đang trả lời...</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex border-t border-gray-700">
                        <input
                            type="text"
                            className="flex-1 bg-gray-800 text-white p-3 outline-none placeholder-gray-400 text-sm rounded-bl-xl"
                            placeholder="Nhập câu hỏi về phim..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                            disabled={loading}
                            autoFocus
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-5 text-white font-semibold rounded-br-xl transition"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatWidget;