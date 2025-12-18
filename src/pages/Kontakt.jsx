import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
    const { theme } = useTheme();
    const navigate = useNavigate()
    
    const [dane, setDane] = useState({ imie: '', email: '', wiadomosc: '' });
    const [bledy, setBledy] = useState({});

    const zmienDane = (e) => {
        setDane({ ...dane, [e.target.name]: e.target.value });
    };

    const wyslijFormularz = (e) => {
        e.preventDefault();
        
        let noweBledy = {};
        
        if (!dane.imie) noweBledy.imie = "Podaj imię!";
        if (!dane.email.includes('@')) noweBledy.email = "Brak Maila";
        if (dane.wiadomosc.length < 5) noweBledy.wiadomosc = "Wiadomość musi miec przynajmiej 5 znaków";

        if (Object.keys(noweBledy).length > 0) {
            setBledy(noweBledy);
        } else {
            console.log("Wysyłam:", dane);
            navigate('/wysłano', { state: { dane } })
            setBledy({});
        }
    };

    const kolorTekstu = theme === 'dark' ? 'white' : 'black';
    const kolortextarea = theme === 'light' ? '#a3a3a3ff' : '#313131ff';

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', color: kolorTekstu }}>
            
            <h1>Kontakt</h1>

            <form onSubmit={wyslijFormularz} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    <label>Imię:</label>
                    <input type="text" name="imie" value={dane.imie} onChange={zmienDane} style={{border:'none',opacity:'0.9',color:'white' ,background: kolortextarea,padding: '10px' }} />
                    {bledy.imie && <span style={{ color: 'red' }}>{bledy.imie}</span>}

                    <label>Email:</label>
                    <input type="text" name="email" value={dane.email} onChange={zmienDane} style={{border:'none',opacity:'0.9',color:'white' ,background: kolortextarea,padding: '10px' }} />
                    {bledy.email && <span style={{ color: 'red' }}>{bledy.email}</span>}

                    <label>Wiadomość:</label>
                    <textarea name="wiadomosc" value={dane.wiadomosc} onChange={zmienDane} style={{resize:'none',border:'none',opacity:'0.9',color:'white' ,background: kolortextarea,padding: '10px',height:'100px' }} />
                    {bledy.wiadomosc && <span style={{ color: 'red' }}>{bledy.wiadomosc}</span>}

                    <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
                        WYŚLIJ
                    </button>

                </form>
        </div>
    );
}