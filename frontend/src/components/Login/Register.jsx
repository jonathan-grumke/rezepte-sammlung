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
                <h1>Registrieren</h1>
                <form onSubmit={handleSubmit}>
                    <label>Benutzername
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>Passwort
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>Passwort wiederholen
                        <input
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            required
                        />
                    </label>
                    <label>Vorname
                        <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </label>
                    <label>Nachname
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </label>
                    <label>E-Mail Adresse
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Registrieren</button>
                </form>
            </div>
        </>
    )

}