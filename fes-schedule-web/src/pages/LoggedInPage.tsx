import { useEffect, useState } from "react";
import { me, logout } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import "./LoggedInPage.css";

export default function LoggedInPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const u = await me();
                setUser(u);
            } catch {
                navigate("/login", { replace: true });
            }
        })();
    }, [navigate]);

    return (
        <div className="logged-in-container">
            <div className="logged-in-content">
                <h1>ログインしました</h1>
                {user && <p>ようこそ、<strong>{user.name}</strong>さん</p>}

                <button
                    className="logout-btn"
                    onClick={async () => {
                        await logout();
                        navigate("/login", { replace: true });
                    }}
                >
                    ログアウト
                </button>
            </div>
        </div>
    );
}
