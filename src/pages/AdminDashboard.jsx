import { Link,NavLink } from "react-router-dom";
export default function AdminDashboard() {
        return(
            <nav style={{display: 'flex', gap:'1em'}}>
                
                <NavLink to="/Admin/users" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>użytkownicy</NavLink>
                <NavLink to="/Admin/settings" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}end>ustawienia</NavLink>
              
            </nav>
        );
}