// src/lib/axiosPhimapi.js
import axios from "axios";

const phimApiClient = axios.create({
    baseURL: "https://phimapi.com/danh-sach",
    headers: {
        "Content-Type": "application/json",
    },
});

export default phimApiClient;