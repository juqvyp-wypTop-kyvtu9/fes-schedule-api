import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/auth";
import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        try {
            await login(email, password);
            navigate("/event-days", { replace: true });
        } catch (e) {
            setError("ログインに失敗しました");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>ログイン</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">メール</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="パスワード"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "ログイン中..." : "ログイン"}
                    </button>
                </form>
                <p className="auth-footnote">
                    新規登録は <Link to="/register">こちら</Link>
                </p>
            </div>
        </div>
    );
}
