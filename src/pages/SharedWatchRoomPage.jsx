// import { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// export default function SharedWatchRoomPage() {
//     const playerRef = useRef(null);
//     const [playing, setPlaying] = useState(false);
//     const [url] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
//     const [chatMessages, setChatMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");

//     useEffect(() => {
//         socket.on("video-control", ({ action, time }) => {
//             if (!playerRef.current) return;
//             if (action === "play") setPlaying(true);
//             if (action === "pause") setPlaying(false);
//             if (action === "seek" && typeof time === "number") {
//                 playerRef.current.seekTo(time, "seconds");
//             }
//         });

//         // Lắng nghe chat
//         socket.on("chat-message", (msg) => {
//             setChatMessages(prev => [...prev, msg]);
//         });

//         return () => {
//             socket.off("video-control");
//             socket.off("chat-message");
//         };
//     }, []);

//     const handlePlay = () => {
//         socket.emit("video-control", { action: "play" });
//         setPlaying(true);
//     };

//     const handlePause = () => {
//         socket.emit("video-control", { action: "pause" });
//         setPlaying(false);
//     };

//     const handleSeek = (time) => {
//         socket.emit("video-control", { action: "seek", time });
//         playerRef.current.seekTo(time, "seconds");
//     };

//     const handleSendMessage = () => {
//         if (newMessage.trim() !== "") {
//             socket.emit("chat-message", newMessage);
//             setNewMessage("");
//         }
//     };

//     return (
//         <div className="p-6 grid grid-cols-3 gap-6">
//             <div className="col-span-2">
//                 <ReactPlayer
//                     ref={playerRef}
//                     url={url}
//                     playing={playing}
//                     controls
//                     width="100%"
//                     height="400px"
//                     onPlay={handlePlay}
//                     onPause={handlePause}
//                 />
//                 <div className="mt-4 space-x-4">
//                     <button onClick={handlePlay} className="bg-green-500 px-4 py-2 rounded text-white">Play</button>
//                     <button onClick={handlePause} className="bg-red-500 px-4 py-2 rounded text-white">Pause</button>
//                     <button onClick={() => handleSeek(60)} className="bg-blue-500 px-4 py-2 rounded text-white">Seek 1:00</button>
//                 </div>
//             </div>
//             <div className="flex flex-col border rounded p-4 bg-gray-900 text-white h-[400px] overflow-y-auto">
//                 <div className="flex-1 space-y-2 mb-4">
//                     {chatMessages.map((msg, idx) => (
//                         <div key={idx} className="bg-gray-700 px-3 py-1 rounded">
//                             {msg}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex space-x-2">
//                     <input
//                         type="text"
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
//                         placeholder="Nhập tin nhắn..."
//                     />
//                     <button onClick={handleSendMessage} className="bg-[#0DE6AC] px-4 py-2 rounded text-black">Gửi</button>
//                 </div>
//             </div>
//         </div>
//     );
// }