import { Link,NavLink } from "react-router-dom";
export default function Navigation() {
        return(
            <nav style={{display: 'flex', gap:'1em'}}>
                <NavLink to="/" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>Home</NavLink>
                <NavLink to="/o-nas" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>o nas</NavLink>
                <NavLink to="/kontakt" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>Kontakt</NavLink>
                <NavLink to="/Blog" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>Blog</NavLink>
                <NavLink to="/Gry" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>Gry</NavLink>
                <NavLink to="/Admin" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>Admin</NavLink>
                  <NavLink to="/Login" style={({isActive}) => ({
                    color: isActive ? 'red' : 'white'
                })}>Login</NavLink>
            </nav>
        );
}