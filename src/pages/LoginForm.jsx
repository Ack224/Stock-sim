import { useState } from "react";
import { useNavigate } from "react-router-dom";

 
export default function LoginForm() {
    const [login, setlogin] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login === "Jakub"){ navigate('/admin')}
        else(console.log("błędny login"))
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={login} onChange={e => setlogin(e.target.value)} />
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    );
}