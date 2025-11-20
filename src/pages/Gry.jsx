import { useEffect,useState } from "react";
import GameCard from "../components/GameCard";
export default function Gry() {
        const [games, setGames] = useState([])

       const fetchGames = async () => {
            const response = await fetch('/api/games');
            const data = await response.json();
            console.log(data)
            setGames(data)
        };

        useEffect(() => {
            fetchGames()
        }, [])
    return(
        <div style={{display: 'flex',flexWrap:'wrap',flexDirection:'row', backgroundColor:"#333", padding:"30px", margin:"30px", gap:'30px'}}>
            {games.map(game => (
                <div style={{border:'2px solid black'}} key ={game.id} >
                    <GameCard game={game}/>
                </div>
            ))}
        </div>
     
    );
}