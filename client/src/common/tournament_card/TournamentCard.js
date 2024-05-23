import React from "react";
import { Link } from "react-router-dom";

export const TournamentCard = ({ tournament }) => {


  return (
    <React.Fragment>
      <div
        className="col-lg-4 col-md-6 col-sm-12 "
        style={{ transform: "scale(.8)" }}
      >
        <div className="card  bg-dark border ">
          <img
            src={tournament.cover_image_url}
            className="card-img-top bg-dark  "
            alt="..."
            height={300}
            width={300}
          />
          <div className="card-body pb-0    ">
            <div className="d-flex   ">
            <h5 className="card-title  text-wrap my-4 fs-3"> {tournament.title}</h5>
            <h5 className="card-text  my-4 fs-6 ms-auto mw-50 rounded-pill p-3  bg-primary" >  {tournament.tournament_status}</h5>
            </div>
            <h5 className="text-warning">{tournament.format}</h5>

            <div className="d-flex justify-content-between fs-5 ">
              <div className="d-flex align-items-center mt-3">
                <p className="card-text pe-3">{tournament.start_date}</p>
                <i className="fa-solid fa-calendar-days mb-3"></i>
              </div>
             
              <div className="d-flex align-items-center mt-3 fs-5">
                <i className="fa-regular fa-clock mb-3"></i>
                <p className="px-3  "> {tournament.start_time}</p>
              </div>
              
            </div>
          </div>
          
          <hr />
        
          {/* <p className="cart-text px-3 fs-4"> {tournament.about}</p> */}
          <div className="card-footer bg-dark">
            
            <Link
              to={`tournament-overview/${tournament._id}`}
              className="btn btn-outline-light text-white rounded-3 fs-5 mb-4 custom-btn"
              style={{
                background:
                  "linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)",
              }}
            >
              Go to tournament
            </Link>
            <div className="d-flex align-items-center">
              {/* <img
                src="https://img.freepik.com/free-vector/detailed-ninja-logo-template_23-2149008973.jpg?w=740&t=st=1714322709~exp=1714323309~hmac=c0a0929caa4a47b55c9fa2de445a8040e53231a1baf94dedfe903c2bc7a236f7 "
                className="rounded-circle me-4"
                style={{ width: 50 }}
                alt="Avatar"
              /> */}
             
            </div>
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
};
