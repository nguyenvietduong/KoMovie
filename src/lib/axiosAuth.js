import axiosAuth from "axios";

const authApi = axiosAuth.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export default authApi;