import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StatusCheckBoxGroup from "../StatusCheckBoxGroup/StatusCheckBoxGroup";
import { Pagination, theme, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
//pagination using antd library

const TournamentsTable = ({
  records,
  currentPage,
  pageSize,
  pageChangeHandler,
  totalTournaments,
  deleteTournamentHandler
}) => {
  const TableRows = [
    "# id",
    "Title",
    "Participants",
    "Status",
    "Registration",
    "Actions",
  ];


  return (
    <React.Fragment>
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
                      <div className="d-flex">
                        {item._id}
                        <Link
                          to={`/tournament-overview/${item._id}`}
                          className="ms-auto me-1"
                        >
                          <i className="fa-regular fa-eye" />
                        </Link>
                      </div>
                    </th>
                    <td>{item.title}</td>
                    <td>{`0/${item.max_participants}`}</td>
                    <td>
                      <StatusCheckBoxGroup
                        groupName={`status_group${index}`}
                        id1={`status_opened${index}`}
                        id2={`status_closed${index}`}
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
                      <div className="d-flex justify-content-around">
                        <Link
                          to={`/organizer/dashboard/management/${item._id}`}
                        >
                          <i className="fa-solid fa-gear" />
                        </Link>
                        <Link onClick={()=>{deleteTournamentHandler(item._id)
                          

                        }} >
                          <i className="fa-solid fa-trash" />
                        </Link>
                      </div>
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
