import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import OrganizerAuthCheck from '../../../CheckAuth/OrganizerCheckAuth';




function GameList(){

    const [games, SetAllGames] = useState([]);

    const {isAuthChecked } =OrganizerAuthCheck();


    useEffect(() => {
        axios.get('http://localhost:5000/api/games')
        .then(response => {
          SetAllGames(response.data);
        })
        .catch(error => {
          console.error('Error display Games:', error);
        });

    }, []);



    const handleDeleteGame=(id)=>{
        axios.delete(`http://localhost:5000/game/delete?id=${id}`).then(()=>{
            SetAllGames(games.filter(game => game._id !== id));
        })
          .catch(error => {
            console.error('Error display Games:', error);
          });
    }

    if (!isAuthChecked) {
        return <div>Loading...</div>;
      }



    return(
        <div className="container-xxl bg-dark">
            <div className="container-md"> 
                <div className="d-flex justify-content-between bg-dark p-3">
                    <div className="text-white">
                        <label className="fs-4">Games</label>
                    </div>
                    <div className="d-flex">
                        <Link to="/organizer/dashboard/games/add" className="btn btn-outline-light btn-primary">
                            + Add Game</Link>
                    </div>
                </div>
            </div>
                    
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                        <th className="text-center">Image</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                        </tr>
                    </thead>

                    
                    <tbody>
                    {games.map((game ,index)=>(

                        <tr key={index}>
                            <td  className="align-middle"style={{ width: '25%' }}>
                                <div className="d-flex justify-content-center align-items-center">
                                
                                <img
                                    src={game.imgUrl}
                                    alt="Image"
                                    className="img-fluid"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            </td>
                            <td className="text-white align-middle text-center" >
                                 
                                    {game.name}
                              
                            </td>
                            
                            <td className="text-white align-middle text-center">
                                
                                <Link to={`/organizer/dashboard/games/edit/${game.name}` } className="btn btn-outline-light btn-primary">Edit</Link>                               
                                
                            </td>
                            <td className="text-white align-middle text-center">
                                
                                    <button className="btn btn-outline-light btn-danger" onClick={()=>{handleDeleteGame(game._id) }}>
                                        Delete
                                    </button>
                                
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
            <Link to="/organizer/dashboard" className="btn btn-outline-light btn-secondary">Back</Link>
        </div>
    );
}

export default GameList;