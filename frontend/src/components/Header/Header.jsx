import "../assets/styles.css";
import "./Header.css";
import { useState, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";

export default function Header() {
    return (
        <header>
            <a href="/" className="header-logo">Moniques Kochbuch</a>
            <SidebarMenu />
        </header>
    )
}