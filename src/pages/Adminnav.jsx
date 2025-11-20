import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function Adminav(){
    return(
        <div>
            <h1>Witaj w panelu Admina</h1>
            <AdminDashboard />
            <main style={{padding: '2rem',minHeight:'70vh'}}>
                <Outlet />
            </main>
            <footer>
                <small>&copy; Moja Strona 2025</small>
            </footer>
             
        </div>
    )
}