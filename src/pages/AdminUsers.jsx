 
export default function AdminUsers() {
    const users = [
        {id:1,name: "Jan Kowal"},
        {id:2,name: "Nowak Paweł"},
        {id:3,name: "Maciej Musiał"},
    ];
    
    
    return(
        <div>
            
            <ul>
                {users.map(user => (
                    <li>{user.name}</li>
                ))}
            </ul>
             
        </div>
    );
}