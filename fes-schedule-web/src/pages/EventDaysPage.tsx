import { useEffect, useState } from "react";
import axios from "axios";
import { fetchMyEventDays, type EventDay } from "../lib/eventDays";
import { fetchMyShiftsByEvent } from "../lib/api";
import { logout } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import "./EventDaysPage.css";

export default function EventDaysPage() {
    const navigate = useNavigate();
    const [days, setDays] = useState<EventDay[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [selectedDayId, setSelectedDayId] = useState<number | "">("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [shifts, setShifts] = useState<MyShift[]>([]);
    const [loadingShifts, setLoadingShifts] = useState(false);
    const [shiftError, setShiftError] = useState<string | null>(null);

    const formatDateJa = (isoDate: string) => {
        const d = new Date(isoDate);
        if (Number.isNaN(d.getTime())) return isoDate;
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}年${m}月${day}日`;
    };


    useEffect(() => {
        (async () => {
            try {
                const data = await fetchMyEventDays();
                setDays(data);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setError(`${e.response?.status} ${e.response?.data?.message ?? e.message}`);
                } else {
                    setError(String(e));
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (e) {
            setError("ログアウトに失敗しました");
        }
    };

    const handleSelectDay = async (day: EventDay | null) => {
        if (!day) {
            setSelectedDayId("");
            setSelectedEventId(null);
            setShifts([]);
            setIsDropdownOpen(false);
            return;
        }
        setSelectedDayId(day.id);
        setSelectedEventId(day.event_id);
        setShiftError(null);
        setLoadingShifts(true);
        setIsDropdownOpen(false);
        try {
            const data = await fetchMyShiftsByEvent(day.event_id);
            const filtered = data.filter((shift) => shift.event_day_id === day.id);
            setShifts(filtered);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setShiftError(`${e.response?.status} ${e.response?.data?.message ?? e.message}`);
            } else {
                setShiftError(String(e));
            }
            setShifts([]);
        } finally {
            setLoadingShifts(false);
        }
    };

    if (loading) return <div className="loading">読み込まれています...</div>;
    if (error) return <div className="error">エラー: {error}</div>;

    return (
        <div className="event-days-container">
            <div className="event-days-header">
                <h1>イベント日一覧</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    ログアウト
                </button>
            </div>

            {days.length === 0 ? (
                <div className="no-data">イベント日がありません。</div>
            ) : (
                <div className="event-days-content">
                    <div className="event-days-selector">
                        <button
                            type="button"
                            className="event-days-dropdown"
                            onClick={() => setIsDropdownOpen((open) => !open)}
                        >
                            {selectedDayId
                                ? `${formatDateJa(days.find((d) => d.id === selectedDayId)?.date ?? "")} ${days.find((d) => d.id === selectedDayId)?.event_name ?? ""
                                }`
                                : "イベント日を選択"}
                            <span className="caret" aria-hidden>
                                ▾
                            </span>
                        </button>
                        {isDropdownOpen && (
                            <div className="event-days-dropdown-menu" role="listbox">
                                {days.map((d) => (
                                    <button
                                        key={d.id}
                                        type="button"
                                        className="event-days-dropdown-item"
                                        onClick={() => handleSelectDay(d)}
                                    >
                                        {formatDateJa(d.date)} {d.event_name ?? ""}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="event-shifts-panel">
                        <h2>自分のシフト一覧</h2>
                        {!selectedEventId && <p>イベント日を選択してください。</p>}
                        {selectedEventId && loadingShifts && <p>読み込み中...</p>}
                        {selectedEventId && shiftError && <p className="error">エラー: {shiftError}</p>}
                        {selectedEventId && !loadingShifts && (
                            <div className="event-shifts-feed">
                                {shifts.map((shift) => (
                                    <div key={shift.id} className="event-shift-item">
                                        <div className="timeline-dot" aria-hidden="true" />
                                        <div className="event-shift-card">
                                            <div className="event-shift-title">
                                                {shift.title ?? "シフト"}
                                            </div>
                                            <div className="event-shift-meta">
                                                <span>{shift.date ?? ""}</span>
                                                <span>
                                                    {shift.start_time} - {shift.end_time ?? ""}
                                                </span>
                                                {shift.location && <span>@{shift.location}</span>}
                                                {shift.role && <span>({shift.role})</span>}
                                            </div>
                                            {shift.manual_url && (
                                                <a
                                                    className="manual-button"
                                                    href={shift.manual_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    マニュアル
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {shifts.length === 0 && <p>自分に割り当てられたシフトはありません。</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

type MyShift = {
    id: number;
    event_day_id: number;
    date?: string;
    label?: string | null;
    start_time: string;
    end_time: string | null;
    title?: string | null;
    description?: string | null;
    location?: string | null;
    role?: string | null;
    status?: string | null;
};
