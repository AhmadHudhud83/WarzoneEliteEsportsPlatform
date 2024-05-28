import React, { useContext } from "react";
import "./Announcements.css";
import { useTournamentDetails } from "../..";
export const Announcements = () => {
  const tournamentDetails = useContext(useTournamentDetails);
  const local_date_format = (newDate) =>
    newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  tournamentDetails.announcements.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return (
    <React.Fragment>
      <ol className="list-group  bg-dark rounded  m-3">
        {tournamentDetails.announcements[0] ? (
          tournamentDetails.announcements.map((announcement, index) => {
            return (
              <div className="mt-4 border rounded" key={index}>
                <li className="list-group-item bg-dark text-white d-flex justify-content-between align-items-start mt-4 fs-4 ">
                  <div className="me-auto">
                    <div className="fw-bold text-muted ms-4 d-flex  ">
                      {announcement.name}
                    </div>
                    <hr className="my-4" />

                    <p className="text-white mt-3 ms-4">
                      {announcement.content}
                    </p>
                  </div>

                  <span className="badge fs-6  text-danger ">
                    {local_date_format(new Date(announcement.date))}
                  </span>
                </li>
              </div>
            );
          })
        ) : (
          <h2 className="text-center p-4 text-danger  border">
            No announcements yet...
          </h2>
        )}
      </ol>
    </React.Fragment>
  );
};
