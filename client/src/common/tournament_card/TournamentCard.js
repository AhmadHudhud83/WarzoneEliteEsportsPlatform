import React from "react";
import { Link } from "react-router-dom";

export const TournamentCard = ({ tournament }) => {
  return (
    <React.Fragment>
      <div className="col-lg-4 col-md-6 col-sm-12 " style={{transform:"scale(.89)"}}>
        <div className="card  bg-dark border ">
          <img
          
             src={tournament.cover_image_url}
            className="card-img-top bg-dark  "
            alt="..."
            height={300}
            width={300}
          />
          <div className="card-body pb-0 ">
            <h5 className="card-title">{tournament.title}</h5>
      
         
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <p className="card-text pe-3">{tournament.start_date}</p>
                <i className="fa-solid fa-calendar-days mb-2"></i>
              </div>
              <div className="d-flex align-items-center">
                <i className="fa-regular fa-clock mb-2"></i>
                <p className="cart-text px-3 "> {tournament.start_time}</p>
                
              </div>
            </div>
            
          </div>
          <hr/>
          <p className="cart-text px-3 "> {tournament.about}</p>
          <div className="card-footer bg-dark">
            <Link to={`tournament-overview/${tournament._id}`}className="btn btn-secondary mb-4 custom-btn">
              Go to tournament
            </Link>
            <div className="d-flex align-items-center">
              <img
                src="https://img.freepik.com/free-vector/detailed-ninja-logo-template_23-2149008973.jpg?w=740&t=st=1714322709~exp=1714323309~hmac=c0a0929caa4a47b55c9fa2de445a8040e53231a1baf94dedfe903c2bc7a236f7 "
                className="rounded-circle me-4"
                style={{ width: 50 }}
                alt="Avatar"
              />
              <h5 className="text-muted">Ahmad hudhud</h5>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
