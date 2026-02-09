import { api } from "./api";

export type EventDay = { id: number; event_id: number; date: string; label: string | null };

export async function fetchMyEventDays(eventId?: number): Promise<EventDay[]> {
    const res = await api.get("/api/me/event-days", {
        params: eventId ? { event_id: eventId } : undefined,
    });
    return res.data;
}
