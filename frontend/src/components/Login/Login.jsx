import { useState } from "react";
import "./Login.css";
import "../assets/styles.css";
import Header from "../Header/Header";
import { useAuth } from "../../hooks/AuthProvider";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            await auth.handleLogin(username, password);
            return;
        }
        alert("Bitte Benutzername und Passwort eingeben.");
    };

    return (
        <>
            <Header />
            <title>Login</title>
            <div className="login-container">
                <div className="">
                    <h1 className="">Login</h1>
                    <form onSubmit={handleSubmit} className="">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=""
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="">Passwort</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=""
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className=""
                        >
                            Login
                        </button>
                    </form>
                    <hr />
                    <div className="">
                        <p>Noch keinen Account?</p>
                        <a href="/registrieren" className="">Registrieren</a>
                    </div>
                </div>
            </div>
        </>
    );
}
