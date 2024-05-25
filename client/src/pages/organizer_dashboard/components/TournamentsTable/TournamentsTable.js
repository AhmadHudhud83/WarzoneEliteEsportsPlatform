import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StatusCheckBoxGroup from "../StatusCheckBoxGroup/StatusCheckBoxGroup";
import { Pagination, theme, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import SupervisorsModal from "../assign_supervisors_modal/SupervisorsModal";
//pagination using antd library

const TournamentsTable = ({
  records,
  currentPage,
  pageSize,
  pageChangeHandler,
  totalTournaments,
  deleteTournamentHandler,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tournamentId, setTournamentId] = useState("");
  const TableRows = [
    "# id",
    "Title",
    "Game",
    "Participants",
    "Status",
    "Registration",
    "Matches",

    "Actions",
    "Announcements",
    "Supervisors",
  ];

  const handleInitialize = async (tournamentId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tournaments/${tournamentId}/initialize-matches`
      );
    } catch (error) {
      console.error("error initializing the tournament matches...", error);
    }
  };

  return (
    <React.Fragment>
      <SupervisorsModal
        showModal={showModal}
        setShowModal={setShowModal}
        tournamentId={tournamentId}
      />
      <div className="table-responsive mt-2">
        <table className="table table-bordered border">
          <thead>
            <tr>
              {TableRows.map((item, index) => {
                return (
                  <th key={index} scope="col">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {records.length !== 0 ? (
              records.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <th scope="row">
                      <div className="d-flex text-muted">
                        {item._id}
                        <Link
                          to={`/tournament-overview/${item._id}`}
                          className="ms-auto me-1"
                        >
                          <i className="fa-regular fa-eye" />
                        </Link>
                      </div>
                    </th>
                    <td className="text-success">{item.title}</td>
                    <td className="text-danger">{item.game} </td>
                    <td>{`${item.participants.length}/${item.max_participants}`}</td>
                    <td>
                      <StatusCheckBoxGroup
                        groupName={`status_group${index}`}
                        id1={`status_opened${index}`}
                        id2={`status_closed${index}`}
                        id3={`status_ongoing${index}`}
                        _status={item.tournament_status}
                        fieldName="tournament_status"
                        thisTournament={records[index]}
                      />
                    </td>
                    <td>
                      <StatusCheckBoxGroup
                        groupName={`registration_group${index}`}
                        id1={`registration_opened${index}`}
                        id2={`registration_closed${index}`}
                        _status={item.registeration_status}
                        fieldName="registeration_status"
                        thisTournament={records[index]}
                      />
                    </td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Link
                          onClick={() => {
                            handleInitialize(item._id);
                          }}
                          className={`btn btn-sm btn-warning`}
                        >
                          {"Initialize"}
                        </Link>
                        <Link
                          to={`/organizer/dashboard/matches/${item._id}`}
                          className="btn btn-sm btn-success  "
                        >
                          Handle
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <div className="btn-group drop  ">
                          <button
                            type="button"
                            className="btn  dropdown-toggle "
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                          <ul className="dropdown-menu bg-dark  ">
                            <div className="d-flex justify-content-around  p-2 bg-dark">
                              <Link
                                className="dropwdown-item btn btn-sm btn-danger"
                                onClick={() => {
                                  deleteTournamentHandler(item._id);
                                }}
                              >
                                Delete
                              </Link>
                              <li>
                                <button
                                  className=" btn btn-sm btn-primary"
                                // href=""
                                >
                                  Cancel
                                </button>
                              </li>
                            </div>
                          </ul>
                        </div>

                        <Link
                          className="btn "
                          to={`/organizer/dashboard/management/${item._id}`}
                        >
                          <i className="fa-solid fa-gear fa-md" />
                        </Link>
                      </div>
                    </td>
                    <td className="text-success text-center">
                      <Link
                        to={`/organizer/dashboard/announcements/${item._id}`}
                      >
                        <i className="fa-solid fa-flag" style={{ color: "lightblue" }} />
                      </Link>
                    </td>
                    <td className="text-success text-center">
                      <i className=" fa-solid fa-user" style={{ color: "red", cursor: "pointer" }} onClick={() => {
                        setTournamentId(item._id);
                        setShowModal(true);
                      }
                      } />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-white text-center p-4">
                <th colSpan={6}>there are no tournaments to display..</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={pageChangeHandler}
          total={totalTournaments}
          showSizeChanger
          showQuickJumper
        />
      </ConfigProvider>
    </React.Fragment>
  );
};
export default TournamentsTable;
