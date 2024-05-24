import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTournamentDetails } from "../..";
export const Participants = () => {


  const tournamentDetails = useContext(useTournamentDetails);
  return (
    <React.Fragment>


      <div className="border-top ">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Reg#</th>
              <th scope="col">Participant</th>
            </tr>
          </thead>
          <tbody>
            {typeof tournamentDetails.participants[0] === "undefined" ? (
              <h1 className="ms-auto fs-4 p-4">No available participants</h1>
            ) : (
              tournamentDetails.participants.map((participant, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{participant.name}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
