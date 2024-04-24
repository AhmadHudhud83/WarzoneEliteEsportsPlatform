import { Link } from "react-router-dom"
export const ManagementButton =()=>{

    
    return(<Link to="management"> <button style={{color:"red"}}  type="button" className="ms-5 border btn btn-dark">Manage</button></Link>)
}