import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout(){
    return(
        <div>
            <Navigation />
            <main style={{padding: '2rem',minHeight:'70vh'}}>
                <Outlet />
            </main>
            <footer>
                <small>&copy; Moja Strona 2025</small>
            </footer>
             
        </div>
    )
}