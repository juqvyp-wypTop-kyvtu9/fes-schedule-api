import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/auth";
import "./RegisterPage.css";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (password !== passwordConfirmation) {
            setError("パスワードが一致しません");
            return;
        }

        setIsLoading(true);
        try {
            await register(name, email, password, passwordConfirmation);
            navigate("/event-days", { replace: true });
        } catch (e) {
            setError("登録に失敗しました");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>新規登録</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">名前</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="例：山田 太郎"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="passwordConfirmation">パスワード（確認用）</label>
                        <input
                            id="passwordConfirmation"
                            type="password"
                            placeholder="パスワードを再入力"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "登録中..." : "登録"}
                    </button>
                </form>
                <p className="auth-footnote">
                    すでにアカウントをお持ちですか？ <Link to="/login">ログイン</Link>
                </p>
            </div>
        </div>
    );
}
