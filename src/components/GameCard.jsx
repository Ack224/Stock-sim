import { Link } from "react-router-dom";

export default function GameCard({game}) {
    return(
        <div style={{height:"500px",width:'500px'}}>
           <Link to={`/Gry/${game.id}`}>
           <h1 style={{height:"30%",width:'100%', fontSize:'50px'}}>{game.title}</h1>
           <img src={game.thumbnail} style={{height:"70%",width:'100%', display:'flex'}} ></img>
           </Link>
        </div>
    );
}