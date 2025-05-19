import React, { useState } from "react";
import axios from "axios";

export default function NaverDictSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await axios.get(
                "https://openapi.naver.com/v1/search/encyc.json",
                {
                    params: { query },
                    headers: {
                        "X-Naver-Client-Id": "88cBAtIHie019PicvQPQ",
                        "X-Naver-Client-Secret": "SMz0W8L7Qc",
                    },
                }
            );
            setResults(response.data.items);
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Korean Dictionary Search</h1>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter a Korean word..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {loading && <p className="mt-4 text-center text-gray-500">Loading...</p>}

            <div className="mt-6 space-y-4">
                {results.map((item, index) => (
                    <div key={index} className="p-4 border rounded shadow-sm">
                        <h2 className="text-lg font-semibold text-blue-700">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.title.replace(/<[^>]*>?/gm, "")}
                            </a>
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: item.description }} className="text-sm text-gray-700"></p>
                    </div>
                ))}
            </div>
        </div>
    );
}
