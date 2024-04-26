import React from "react"
import './style.css' 
import {tournaments} from './dummyData'
export const TournamentDashboard = ()=>{





    return(<React.Fragment >



<div className="container">
<div className="row row-cols-1 row-cols-md-3 g-4 m-4  ">

        {tournaments.map((i,e)=>{


return(  <div className="col-lg-4 col-md-6 col-sm-12 ">
<div className="card h-100 " style={{width:"90%"}}>
  <img src={i.url} className="card-img-top bg-dark" alt="..." />
  <div className="card-body bg-dark">
    <h5 className="card-title">{i.title}</h5>
    <p className="card-text">{i.text}</p>
  </div>
  <div className="card-footer bg-dark">
  <a href="#" className="btn btn-secondary mb-4 custom-btn" >Load more</a>
    <small className="text-muted d-block">something else to say</small>


  </div>
</div>
</div>)

        })}
 
</div>
<a href="#" className="btn btn-secondary mb-4 custom-btn mt-5" >Create a new tournament</a>
</div>


    </React.Fragment>)
}