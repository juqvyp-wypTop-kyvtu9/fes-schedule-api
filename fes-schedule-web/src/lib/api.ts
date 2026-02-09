import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,

    // Laravel(Sanctum) がセットする Cookie 名と、送るべき CSRF ヘッダ名を明示
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",

    headers: {Accept: "application/json"},
});

api.interceptors.request.use((config) => {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
    if (match) {
        config.headers = config.headers ?? {};
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[1]);
    }
    return config;
});
