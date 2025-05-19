// src/lib/axiosPhimapi.js
import axiosSearch from "axios";

const phimApiSearchClient = axiosSearch.create({
    baseURL: " https://phimapi.com/v1/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default phimApiSearchClient;