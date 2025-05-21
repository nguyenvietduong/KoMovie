import axiosAuth from "axios";

const authApi = axiosAuth.create({
    baseURL: "http://localhost:2004",
    headers: {
        "Content-Type": "application/json",
    },
});

export default authApi;