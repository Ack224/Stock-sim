import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Pobieramy nasz hook
import './Navigation.css';

export default function Navigation() {
    const { theme, toggleTheme } = useTheme(); // Używamy funkcji zmiany motywu

    return (
        <nav className="navbar" style={{ backgroundColor: 'var(--nav-bg)' }}>
            <Link to="/" className="nav-logo" style={{ color: 'var(--text-color)' }}>
                StockSim 📈
            </Link>

            <div className="nav-links-container">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
                <NavLink to="/market" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Rynek</NavLink>
                <NavLink to="/portfolio" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Portfel</NavLink>
                <NavLink to="/symulator" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Symulator</NavLink>

                {/* PRZYCISK ZMIANY MOTYWU */}
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '10px',
                        color: 'var(--text-color)'
                    }}
                    title="Zmień motyw"
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>

                <NavLink to="/Login" className="nav-item nav-btn-login">Login</NavLink>
            </div>
        </nav>
    );
}