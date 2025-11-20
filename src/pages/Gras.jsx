import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Gras() {
    const {graid} =useParams();
    const fetchGames = async (id) => {
            const response = await fetch('/api/game?id='+graid);
            const data = await response.json();
            setgame(data)
        };
    const [gra,setgame] = useState(fetchGames(graid));
     
    return(
        <div style={{height:'100%', backgroundColor:'#344'}}>
            <h1 style={{fontSize:'100px'}}>{gra.title}</h1>
            <img src={gra.thumbnail}></img>
            <p>{gra.short_description}</p>
            <p>{gra.developer}</p>
            
        </div>
    );
}