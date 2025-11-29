import { useState, useContext, createContext, useEffect } from "react";
import { getCSRF } from "../utils/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (username, password) => {
        const { csrfToken } = await getCSRF();
        const res = await fetch(window.location.origin + "/myapp/login", {
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
        if (json.status != null && json.status === "authenticated") {
            window.location.href = "/";
        }
        else {
            alert("Benutzer konnte nicht authentifiziert werden.");
        }
    };

    const handleLogout = () => {
        fetch(window.location.origin + "/myapp/logout", {
            credentials: 'include',
        });
        window.location.href = "/";
    };

    const handleRegister = async (username, password, firstname, lastname, email) => {
        const { csrfToken } = await getCSRF();
        const res = await fetch(window.location.origin + "/myapp/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
            }),
        });
        const json = await res.json();
        if (json.status != null && json.status === "success") {
            window.location.href = "/";
        }
        else if (json.status != null && json.status === "error") {
            alert("Benutzername existiert bereits.");
        }
        else {
            alert("Registrierung fehlgeschlagen.");
        }
    };

    const fetchCurrentUser = () => {
        fetch(window.location.origin + '/myapp/current_user')
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    setUser(data);
                }
            })
            .catch(error => console.error('Error fetching current user:', error));
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};