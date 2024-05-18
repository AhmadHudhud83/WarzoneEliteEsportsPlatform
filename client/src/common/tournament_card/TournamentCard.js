

import React from 'react'
import { Link } from 'react-router-dom'

export const TournamentCard = ({props})=>{


return(<React.Fragment>
{props.map((i,e)=>{


return(  <div key={e} className="col-lg-4 col-md-6 col-sm-12 ">
<div className="card h-100 bg-dark border" >
  <img style={{height:"55%"}} src={i.url} className="card-img-top bg-dark mt-2" alt="..." />
  <div className="card-body ">
    <h5 className="card-title">{i.title}</h5>
    <p className="card-text my-3">{i.text}</p>
    <div className='d-flex justify-content-between'>
      <div className='d-flex align-items-center'>
    <p className='card-text pe-3'> 10/20/1023</p>
    <i className="fa-solid fa-calendar-days mb-2"></i>
    </div>
    <div className='d-flex align-items-center'>
    <i className="fa-regular fa-clock mb-2"></i>
    <p className='cart-text px-3 '> 10:00pm</p>
   
    </div>
    </div>

  </div>
  <div className="card-footer bg-dark">
  <Link to="#" className="btn btn-secondary mb-4 custom-btn" >Go to tournament</Link>
  <div className='d-flex align-items-center'>
  <img src="https://img.freepik.com/free-vector/detailed-ninja-logo-template_23-2149008973.jpg?w=740&t=st=1714322709~exp=1714323309~hmac=c0a0929caa4a47b55c9fa2de445a8040e53231a1baf94dedfe903c2bc7a236f7 " className="rounded-circle me-4" style={{width:50}} alt="Avatar" />
  <h5 className='text-muted'>Ahmad hudhud</h5>
  </div>

  </div>
</div>
</div>)

        })}



    
</React.Fragment>)
    
}