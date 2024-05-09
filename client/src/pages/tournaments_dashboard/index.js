import React from "react";

import "./style.css";
import { tournaments } from "./dummyData";
import { TournamentCard } from "../../common/tournament_card/TournamentCard";
import { Link } from "react-router-dom";
export const TournamentDashboard = () => {
  //here the data from based on organizer_id (his own data of  created tournaments)

  return (
    <React.Fragment>
      <div className="container">
      <div className="offcanvas offcanvas-start bg-dark" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Organaizer Dashboard</h5>
    <button type="button" className="btn-close bg-secondary" data-bs-dismiss="offcanvas" aria-label="Close" />
  </div>
  <div className="offcanvas-body">

  
    <div style={{width:"60%"}}>
      <Link to="organizer/dashboard/select-game" className="btn btn-secondary mb-4 custom-btn mt-5 d-block ">
         Create a new tournament
        </Link>
        </div>
       

  </div>
</div>
       
 
<button class="btn btn-secondary"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
 Dashboard
</button>




    
      
      </div>
    </React.Fragment>
  );
};
