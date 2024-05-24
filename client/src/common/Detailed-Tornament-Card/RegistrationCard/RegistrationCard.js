import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTournamentDetails } from "..";
const RegistrationCard = () => {
  const tournament = useContext(useTournamentDetails);

  return (
    <React.Fragment>
      <div
        className="card bg-dark mt-5 ms-5 border border-2 border-danger"
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
          <button
            className="btn btn-danger my-4"
            disabled={tournament.registeration_status === "Closed"}
          >
            Join Tournament
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default RegistrationCard;
