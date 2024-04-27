

import React from 'react'

export const TournamentCard = ({props})=>{


return(<React.Fragment>
{props.map((i,e)=>{


return(  <div className="col-lg-4 col-md-6 col-sm-12 ">
<div className="card h-100 bg-dark border" style={{height:"20px !important"}} >
  <img style={{height:"55%"}} src={i.url} className="card-img-top bg-dark mt-2" alt="..." />
  <div className="card-body ">
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



    
</React.Fragment>)
    
}