import React from "react"

export const Matches =()=>{
    const TeamsArr=[
        {name:"Ahmad",no:"1"},
        {name:"Osama",no:"2"},
        {name:"Rama",no:"3"},
        {name:"Areen",no:"4"},
        {name:"Areen",no:"5"},
    ]
return(<React.Fragment>
  



 <h5 className="text-start my-3 ms-5">Participants</h5> 



   
    
 
    <div className= "border ">
   <table className="table">
  <thead>
    <tr>
    <th scope="col">Id</th>
      <th scope="col">Player</th>
      <th scope="col">Team</th>
     
    </tr>
  </thead>
  <tbody>

    {(typeof TeamsArr[0] ==='undefined') ?  (<h1 className="ms-auto">No available teams</h1>):  TeamsArr.map((e)=>{
        return(<tr>
<th scope="row">{e.no}</th>
<td>{e.name}</td>
<td>{e.name}</td>

        </tr>)
    })}
   
  
  </tbody>
</table>



    </div>




</React.Fragment>)



}