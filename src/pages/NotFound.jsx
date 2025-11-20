import { Link } from "react-router-dom";

export default function NotFound() {
    return(
        <div>
            <h1>404.: error</h1>
            <p>(nie) Witam w naszej aplikacji</p>
            <Link to="/" >Home</Link>
        </div>
    );
}