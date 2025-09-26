import "../assets/styles.css";
import { useState, useEffect } from "react";

export default function Header() {
    const isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <header>
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/rezepte">Rezepte</a></li>
            </ul>
            {isLoggedIn &&
                <div>
                    Angemeldet als {sessionStorage.getItem("username")} | <a href="#" onClick={() => { sessionStorage.removeItem("username"); window.location.href = "/"; }}>Logout</a>
                </div>
            }
        </header>
    )
}