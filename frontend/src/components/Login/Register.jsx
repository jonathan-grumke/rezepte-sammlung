import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import "./Register.css";
import "../assets/styles.css";
import Header from "../Header/Header";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordRepeat) {
            alert("Die Passwörter stimmen nicht überein.");
            return;
        }
        if (username !== "" && password !== "" && firstname !== "" && lastname !== "" && email !== "") {
            await auth.handleRegister(username, password, firstname, lastname, email);
            return;
        }
        alert("Bitte alle Felder ausfüllen.");
    };

    return (
        <>
            <Header />
            <title>Registrieren</title>
            <div className="register-container">
                <div>
                    <h1>Registrieren</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Benutzername</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Passwort</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password_repeat">Passwort wiederholen</label>
                            <input
                                id="password_repeat"
                                type="password"
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="firstname">Vorname</label>
                            <input
                                id="firstname"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname">Nachname</label>
                            <input
                                id="lastname"
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">E-Mail Adresse</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Registrieren</button>
                    </form>
                </div>
            </div>
        </>
    )

}