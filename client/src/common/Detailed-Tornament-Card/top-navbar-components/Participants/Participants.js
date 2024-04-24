import React from "react"
import { Link } from "react-router-dom"

export const Participants =()=>{
const TeamsArr=[
    {name:"TeamOne",no:"1"},
    {name:"TeamTwo",no:"2"},
    {name:"TeamThree",no:"3"},
    {name:"TeamFour",no:"4"},
]

return (<React.Fragment>
<div className="d-flex m-4"><h5 className="text-start">Teams</h5>
    <button type="button" className="btn btn-primary ms-auto">+Add Teams</button></div>
    
 
    <div className="border ">
   <table className="table">
  <thead>
    <tr>
      <th scope="col">Reg#</th>
      <th scope="col">Team</th>
      <th scope="col"># of Players</th>
     
    </tr>
  </thead>
  <tbody>

    {(typeof TeamsArr[0] ==='undefined') ?  (<h1 className="ms-auto">No available teams</h1>):  TeamsArr.map((e)=>{
        return(<tr>
<th scope="row">{e.no}</th>
<td>{e.name}</td>
<td>{e.no}</td>
        </tr>)
    })}
   
  
  </tbody>
</table>



    </div>





</React.Fragment>)



}