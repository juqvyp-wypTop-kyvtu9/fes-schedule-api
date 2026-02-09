import { api } from "./api";

export async function fetchMySchedules(eventDayId) {
    const res = await api.get("/api/me/schedules", {
        params: { event_day_id: eventDayId },
    });
    return res.data;
}
