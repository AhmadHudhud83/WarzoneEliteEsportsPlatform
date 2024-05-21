import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';





function SupervisorList(){

    const [supervisors, SetAllSupervisors] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/supervisor/allsupervisor')
          .then(response => {
            SetAllSupervisors(response.data);
          })
          .catch(error => {
            console.error('Error display Supervisors:', error);
          });

    }, []);



    const handleDeleteSupervisors=(id)=>{
        axios.delete(`http://localhost:5000/supervisor/delete?id=${id}`)
          .catch(error => {
            console.error('Error display Supervisors:', error);
          });
    }





    return(
        <div className="container-xxl bg-dark">
            <div className="container-md"> 
                <div className="d-flex justify-content-between bg-dark p-3">
                    <div className="text-white">
                        <label className="fs-4">Supervisors</label>
                    </div>
                    <div className="d-flex">
                        <Link to="/organizer/supervisor/add" className="btn btn-outline-light btn-primary">
                            + Add Supervisor</Link>
                    </div>
                </div>
            </div>
                    
            <div className="table-responsive">
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Edit</th>
                        <th className="text-center">Delete</th>
                        </tr>
                    </thead>

                    
                    <tbody>
                    {supervisors.map((supervisor ,index)=>(

                        <tr key={index}>
                            <td>
                                <div className="d-flex justify-content-center align-items-center">
                                <label >{supervisor.name}</label>
                                </div>
                            </td>
                            <td className="text-white" >
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                    <label >{supervisor.email}</label>
                                </div>
                            </td>
                            
                            <td>
                                <div className="d-flex justify-content-center">
                                <Link to={`/organizer/supervisor/edit/${supervisor._id}` } className="btn btn-outline-light btn-primary">Edit</Link>                                </div>
                                
                            </td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-outline-light btn-danger" onClick={()=>handleDeleteSupervisors(supervisor._id)}>Delete</button>
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

export default SupervisorList;