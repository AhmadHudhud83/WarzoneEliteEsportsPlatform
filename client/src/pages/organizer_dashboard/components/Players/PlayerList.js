import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';





function PlayerList(){

    const [players, SetAllPlayers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/player/allplayer')
          .then(response => {
            SetAllPlayers(response.data);
          })
          .catch(error => {
            console.error('Error display players:', error);
          });

    }, []);



    const handleDeletePlayers=(id)=>{
        axios.delete(`http://localhost:5000/player/delete?id=${id}`)
          .catch(error => {
            console.error('Error display players:', error);
          });
    }





    return(
        <div className="container-xxl bg-dark">
            <div className="container-md"> 
                <div className="d-flex justify-content-between bg-dark p-3">
                    <div className="text-white">
                        <label className="fs-4">Players</label>
                    </div>
                    <div className="d-flex">
                        <Link to="/organizer/player/add" className="btn btn-outline-light btn-primary">
                            + Add Players</Link>
                    </div>
                </div>
            </div>
                    
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                        </tr>
                    </thead>

                    
                    <tbody>
                    {players.map((player ,index)=>(

                        <tr key={index}>
                            <td>
                                <div className="d-flex justify-content-center align-items-center">
                                <label >{player.name}</label>
                                </div>
                            </td>
                            <td className="text-white" >
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                    <label >{player.email}</label>
                                </div>
                            </td>
                            
                            <td>
                                <div className="d-flex justify-content-center">
                                <Link to={`/organizer/dashboard/players/edit/${player._id}` } className="btn btn-outline-light btn-primary">Edit</Link>                                </div>
                                
                            </td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-outline-light btn-danger" onClick={()=>handleDeletePlayers(player._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
}

export default PlayerList;