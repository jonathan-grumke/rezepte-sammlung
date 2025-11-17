import { useState } from "react";

import "./Login.css";
import "../assets/styles.css";
import Header from "../Header/Header";
import { getCSRF } from "../utils/auth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let login_url = window.location.origin + "/myapp/login";

        const { csrfToken } = await getCSRF();

        const res = await fetch(login_url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        });

        const json = await res.json();
        if (json.status != null && json.status === "Authenticated") {
            sessionStorage.setItem('username', json.username);
            window.location.href = "/";
        }
        else {
            alert("User konnte nicht authentifiziert werden.");
        }
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
                            <label className="">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=""
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="">Passwort</label>
                            <input
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
                </div>
            </div>
        </>
    );
}
