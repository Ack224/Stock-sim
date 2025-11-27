import { createContext, useState, useEffect, useContext } from 'react';

// 1. Tworzymy kontekst (pudełko na dane)
const ThemeContext = createContext();

// 2. Dostawca motywu (otacza całą aplikację)
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark'); // Domyślnie jasny

    // Funkcja zmiany motywu
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Efekt: Kiedy zmienia się 'theme', aktualizujemy atrybut w HTML
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. Własny hook (żeby łatwiej używać w innych plikach)
export const useTheme = () => useContext(ThemeContext);