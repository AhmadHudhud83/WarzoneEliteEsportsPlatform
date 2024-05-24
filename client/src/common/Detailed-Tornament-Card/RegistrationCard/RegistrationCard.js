import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { useTournamentDetails } from "..";
const RegistrationCard = () => {
  const tournament = useContext(useTournamentDetails);
  const [showReportBox, setShowReportBox] = useState(false);

  const handleReportClick = () => {
    setShowReportBox(true);
  };

  const handleCloseReportBox = () => {
    setShowReportBox(false);
  };
  return (
    <React.Fragment>
      <div
        className="card bg-dark mt-5 ms-5 g "
        style={{ width: "40rem", height: "25rem" }}
      >
        <div className="card-body">
          <h2 className="card-title my-5  ">
            Registration {tournament.registeration_status}
          </h2>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>

          <h4>
            {tournament.participants.length}/{tournament.max_participants}{" "}
            Participants
          </h4>

          <div className="btn-group">
            <button type="button" className="btn btn-danger">
              Report
            </button>
            <button
              type="button"
              className="btn btn-danger dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded={showReportBox}
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" >Action</a></li>
              <li><a className="dropdown-item" >Another action</a></li>
              <li><a className="dropdown-item" >Something else here</a></li>
              <li>
                <a className="dropdown-item" onClick={handleReportClick}>
                  Other ...
                </a>
              </li>
            </ul>
          </div>
          {showReportBox && (
            <div className="report-box">
              <textarea placeholder="Write your report here..." />
              <button onClick={handleCloseReportBox}>Close</button>
            </div>
          )}

        </div>

        <button
          className="btn btn-danger "
          disabled={tournament.registeration_status === "Closed"}
        >
          Join Tournament
        </button>

      </div>
    </React.Fragment>
  );
};
export default RegistrationCard;
