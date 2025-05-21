import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";

const API_KEY = "AIzaSyDb2l6VYNttvyVlWvZRMC4B8ML62atZRN8";
const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";

export default function YouTubePage({ onSelectVideo }) {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState("Lofi Music");

    const breadcrumbItems = [
        { label: "Trang chủ", to: '/' },
        { label: "Youtube", to: '/youtube' },
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(YOUTUBE_API, {
                    params: {
                        part: "snippet",
                        q: query,
                        type: "video",
                        key: API_KEY,
                        maxResults: 12,
                    },
                });
                setVideos(res.data.items);
            } catch (err) {
                console.error("Failed to fetch YouTube videos", err);
            }
        };

        fetchVideos();
    }, [query]);

    return (
        <>
            <div className="container mx-auto px-4 py-10 space-y-16">
                <Breadcrumb items={breadcrumbItems} />

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
                    🎬 YouTube Videos
                </h2>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm kiếm video..."
                    className="p-2 border border-gray-300 rounded w-full mb-4"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <button
                            key={video.id.videoId}
                            onClick={() =>
                                onSelectVideo(
                                    `https://www.youtube.com/embed/${video.id.videoId}`
                                )
                            }
                            className="text-left bg-gray-900 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform shadow-md"
                        >
                            <div className="relative">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="w-full h-52 object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                                    HD
                                </div>
                            </div>

                            <div className="flex gap-3 p-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold line-clamp-2">
                                        {video.snippet.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {video.snippet.channelTitle}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
