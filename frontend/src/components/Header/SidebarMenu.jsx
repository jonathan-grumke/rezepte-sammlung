import { useState, useEffect, useRef } from 'react';
import './SidebarMenu.css';
import { useAuth } from '../../hooks/AuthProvider';

export default function SidebarMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarRef = useRef(null);
    const firstFocusableRef = useRef(null);
    const burgerButtonRef = useRef(null);

    const auth = useAuth();

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

    const handleLogout = () => {
        auth.handleLogout();
    };

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
                {auth.user?.authenticated && (
                    <p className="welcome-message">
                        Hallo {auth.user?.firstname}!
                    </p>
                )}
                <ul className="sidebar-links">
                    <li>
                        <a href="/">Startseite</a>
                    </li>
                    {!auth.user?.authenticated &&
                        <>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/registrieren">Registrieren</a>
                            </li>
                        </>
                    }
                    {auth.user?.role === "admin" &&
                        <>
                            <li>
                                <a href="/neues-rezept">Neues Rezept erstellen</a>
                            </li>
                            <li>
                                <a href="/nicht-veroeffentlichte-rezepte">Nicht veröffentlichte Rezepte</a>
                            </li>
                        </>
                    }
                    {auth.user?.authenticated &&
                        <>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
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
