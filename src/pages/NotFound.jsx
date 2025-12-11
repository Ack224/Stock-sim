import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: 40 }}>
            <h1 style={{ margin: 0 }}>404</h1>
            <p style={{ marginTop: 8 }}>Strona nie istnieje.</p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    marginTop: 12,
                    padding: '8px 12px',
                    background: '#10b981',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 6,
                }}
            >
                Powrót do strony głównej
            </Link>
        </div>
    );
}