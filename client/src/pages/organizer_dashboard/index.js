import React from "react";

import "./style.css";
import { useState, useEffect, createContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TournamentsTable from "./components/TournamentsTable/TournamentsTable";
import axios from "axios";
import SideBar from "../../common/SideBar/SideBar";
export const useTournamentDetails = createContext();
export const OrganizerDashboard = () => {
  
  const location = useLocation(); //keep track of path
  const navigate = useNavigate(); //for navigation
  const [tournamentsData, setTournamentsData] = useState([]); //tournament data state
  const [records, setRecords] = useState([]); //filterd touranment data state for searching
  const [currentPage, setCurrentPage] = useState(1); //current page tracker
  const [pageSize, setPageSize] = useState(10); //for page size
  const [totalTournaments, setTotalTournaments] = useState(0);
  // const currentData = records.slice(
  //   //for the pagination logic
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  const dashboardElements = [
    {
      label: "New Tournament",
      link: "select-game",
      icon: <i className="fa-solid fa-plus" />,
    },
    {
      label: "Add Game",
      link: "add-game",
      icon: <i className="fa-solid fa-plus" />,
    },

    {
      label: "Supervisors List",
      link: "supervisors",
      icon: <i className="fa-solid fa-people-arrows" />,
    },
    {
      label: "Players List",
      link: "players",
      icon: <i className="fa-solid fa-person" />,
    },
    {
      label: "Reports",
      link: "reports",
      icon: <i className="fa-solid fa-flag" />,
    },
    {
      label: "Contact Requests",
      link: "contact-requests",
      icon: <i className="fa-solid fa-address-book" />,
    },
    {
      label: "Feedbacks",
      link: "/feedbacks",
      icon: <i className="me-2 fa-solid fa-comments" />,
    },
    {
      label: "Logout",
      link: "/logout",
      icon: <i className="fa-solid fa-right-from-bracket fa-rotate-180 me-3" />,
    },
  ];

  const fetchTournaments = async (page, pageSize) => {
    //refresh button handler  (refresh table only)
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tournaments/paginated",
        {
          params: { page, pageSize },
        }
      );
      console.log("Tournaments Data : ", res.data);

      setTournamentsData(res.data.tournaments);
      setRecords(res.data.tournaments);
      setTotalTournaments(res.data.totalTournaments);
    } catch (e) {
      console.error("Error fetching Tournaments data:", e);
    }
  };
  useEffect(() => {
    //  console.log("Location: ",location)
    const query = new URLSearchParams(location.search); //defining the query params
    const page = parseInt(query.get("page")) || 1; //if there is nothing in query params , then default page value to get is 1
    const pageSize = parseInt(query.get("pageSize")) || 10; // in case no query params given , default page size is 10
    setCurrentPage(page);
    setPageSize(pageSize);
    fetchTournaments(page, pageSize);
  }, [location.search]);
  const pageChangeHandler = (page, pageSize) => {
    navigate(`?page=${page}&pageSize=${pageSize}`);
  };
  const Filter = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setRecords(
      tournamentsData.filter((tournament) =>
        tournament.title.toLowerCase().includes(inputValue)
      )
    );
  };
  //===============deleting tournament action======================
  const deleteTournamentHandler = async (tournamentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/tournaments/${tournamentId}`
      );
      console.log(res.status);
      setRecords(
        records.filter((tournament) => tournament._id !== tournamentId)
      );
    } catch (error) {
      console.error("Error deleting tournament", error);
    }
    //reset the table
    // setRecords((records));
    //fetchTournaments(currentPage, pageSize);
  };
  return (
    <React.Fragment>
      <useTournamentDetails.Provider value={tournamentsData}>

        <div className="organizer-dashboard">
        <div className="container " >
          <SideBar elementsList={dashboardElements} sideBarTitle="Organizer Dashboard" />

          <h1 className="text-white mb-4">Tournaments</h1>
          <div className="d-flex align-items-center">
            <div className="mb-3 d-flex w-50 ">
              <input
                type="email"
                className="form-control bg-dark text-white form-control-sm"
                onChange={Filter}
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label  ms-4"
              >
                <i className="fas fa-search " />
              </label>
            </div>

            <button
              onClick={() => {
                setRecords([]);
                fetchTournaments(currentPage, pageSize);
              }}
              className="btn btn-danger ms-auto  "
            >
              <i className="fa fa-refresh me-2 " aria-hidden="true" />
              Refresh
            </button>
          </div>
          <TournamentsTable
            records={records}
            pageSize={pageSize}
            currentPage={currentPage}
            pageChangeHandler={pageChangeHandler}
            totalTournaments={totalTournaments}
            deleteTournamentHandler={deleteTournamentHandler}
          />
        </div>
        </div>
      </useTournamentDetails.Provider>
    </React.Fragment>
  );
};
