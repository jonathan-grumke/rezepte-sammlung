import React, { useState, useEffect, useRef } from 'react';
import './SidebarMenu.css';

export default function SidebarMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const firstFocusableRef = useRef(null);
    const burgerButtonRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    // Close sidebar with ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                burgerButtonRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Focus trapping when sidebar is open
    useEffect(() => {
        if (isOpen) {
            const focusableEls = sidebarRef.current.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            const handleTabKey = (e) => {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) {
                    // SHIFT + TAB
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    // TAB
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            };

            document.addEventListener('keydown', handleTabKey);
            firstEl?.focus();

            return () => document.removeEventListener('keydown', handleTabKey);
        } else {
            // Restore focus to burger button when closed
            // burgerButtonRef.current?.focus();
        }
    }, [isOpen]);

    const isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

    return (
        <>
            <button
                ref={burgerButtonRef}
                className="burger-button"
                onClick={toggleSidebar}
                aria-expanded={isOpen}
                aria-controls="sidebar-menu"
                aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
                <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
                <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
                <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
            </button>

            <aside
                id="sidebar-menu"
                ref={sidebarRef}
                className={`sidebar ${isOpen ? 'open' : ''}`}
                aria-hidden={!isOpen}
            >
                <ul>
                    {!isLoggedIn &&
                        <li><a href="/login">Login</a></li>
                    }
                    {isLoggedIn &&
                        <>
                            <li>
                                Angemeldet als {sessionStorage.getItem("username")}
                            </li>
                            <li>
                                <a href="#" onClick={() => { sessionStorage.removeItem("username"); window.location.href = "/"; }}>Logout</a>
                            </li>
                        </>
                    }
                    {isLoggedIn &&
                        <li><a href="/neues-rezept">Neues Rezept erstellen</a></li>
                    }
                    <li>
                        <button onClick={() => setIsOpen(false)}>Menü schließen</button>
                    </li>
                </ul>
            </aside>

            {/* Optional overlay for closing */}
            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
};
