import { useEffect, useState } from "react";
import axios from "axios";
import { fetchMyEventDays, type EventDay } from "../lib/eventDays";
import { logout } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import "./EventDaysPage.css";

export default function EventDaysPage() {
    const navigate = useNavigate();
    const [days, setDays] = useState<EventDay[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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
                <ul className="event-days-list">
                    {days.map((d) => (
                        <li key={d.id} className="event-day-item">
                            <span className="date">{d.date}</span>
                            <span className="label">{d.label ?? "ラベルなし"}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
