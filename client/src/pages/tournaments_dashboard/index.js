import React from "react";

import "./style.css";
import { tournaments } from "./dummyData";
import { TournamentCard } from "../../common/tournament_card/TournamentCard";
export const TournamentDashboard = () => {
  //here the data from based on organizer_id (his own data of  created tournaments)

  return (
    <React.Fragment>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4 m-4  ">
          <TournamentCard props={tournaments}></TournamentCard>
        </div>
        <a href="#" className="btn btn-secondary mb-4 custom-btn mt-5">
          Create a new tournament
        </a>
      </div>
    </React.Fragment>
  );
};
