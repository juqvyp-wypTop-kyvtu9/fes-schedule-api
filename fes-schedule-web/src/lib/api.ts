import axios from "axios";



export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
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

// イベント一覧取得
export async function fetchEvents() {
    const res = await api.get("/api/events");
    return res.data;
}

// イベントIDごとのシフト一覧取得
export async function fetchShiftsByEvent(eventId: number) {
    const res = await api.get(`/api/events/${eventId}/shifts`);
    return res.data;
}

// イベントIDごとの自分のシフト一覧取得
export async function fetchMyShiftsByEvent(eventId: number) {
    const res = await api.get(`/api/events/${eventId}/my-shifts`);
    return res.data;
}
