import { Link } from "react-router-dom"

export const ManagementButton =(props)=>{

    
    return(<Link to={props.url}> <button style={{color:"red"}}  type="button" className="ms-5 border btn btn-dark">Manage</button></Link>)
}