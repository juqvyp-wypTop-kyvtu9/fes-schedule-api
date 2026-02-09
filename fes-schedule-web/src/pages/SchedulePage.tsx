import { useEffect, useState } from "react";
import { fetchMyEventDays } from "../lib/eventDays";
import { fetchMySchedules } from "../lib/schedules";
import "./SchedulePage.css";

export default function SchedulePage() {
    const EVENT_ID = 1;
    const [days, setDays] = useState([]);
    const [selectedDayId, setSelectedDayId] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const d = await fetchMyEventDays(EVENT_ID);
            setDays(d);
            if (d.length > 0) setSelectedDayId(String(d[0].id));
        })();
    }, []);

    useEffect(() => {
        if (!selectedDayId) return;
        (async () => {
            const s = await fetchMySchedules(Number(selectedDayId));
            setItems(s);
        })();
    }, [selectedDayId]);

    return (
        <div className="schedule-container">
            <h2>担当スケジュール</h2>

            <select value={selectedDayId} onChange={(e) => setSelectedDayId(e.target.value)}>
                <option value="">スケジュール日を選択</option>
                {days.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.label ?? d.date}
                    </option>
                ))}
            </select>

            <div className="schedules-list">
                {items.length === 0 ? (
                    <p>スケジュールがありません</p>
                ) : (
                    items.map((it) => (
                        <div key={it.id} className="schedule-item">
                            <div className="schedule-time">{it.start_time} {it.end_time ? `- ${it.end_time}` : ""}</div>
                            <div className="schedule-title">{it.title}</div>
                            <div className="schedule-location">{it.location}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
}
