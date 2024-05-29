import React, { createContext, useEffect, useState } from "react";
import "./style.css";
import { Overview } from "./top-navbar-components/Overview/Overview";
import { Participants } from "./top-navbar-components/Participants/Participants";
import { Announcements } from "./top-navbar-components/Announcements/Announcements";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Description } from "./top-navbar-components/Description/Description";
import axios from "axios";
import Sponsors from "./top-navbar-components/Sponsors/Sponsors";
import ParticipatingModal from "../participating_modal/ParticipatingModal";
import Matches from "../../pages/supervisor_dashboard/matches/Matches";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export const useTournamentDetails = createContext();

export const DetailedTournamentCard = (props) => {
  const { id } = useParams();
  const [userId, setUserId] = useState(Cookies.get("user_id"));
  const [loading, setLoading] = useState(true);
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const [participated, setParticipated] = useState(false);
  const { t, i18n } = useTranslation();
  const [showReportBox, setShowReportBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [gameTag, setGameTag] = useState("");
  const [discordTag, setDiscordTag] = useState("");
  const navigate = useNavigate();


  const handleReportClick = () => {
    setShowReportBox(true);
  };

  const handleCloseReportBox = () => {
    setShowReportBox(false);
  };
  const handleOpenReportBox = () => {
    setShowReportBox(false);
  };
  const fetchTournamentDetails = () => {
    axios
      .get(`/api/tournaments/${id}`)
      .then((res) => {
        setTournamentDetails(res.data);
        setLoading(false);
        if (userId !== null) {
          setParticipated(res.data.participants.some(participant => participant._id === userId));
        }
      })
      .catch((e) => {
        console.error("Error fetching the tournament details", e);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTournamentDetails()
  }, [id]);


  const [activeTopComponent, setActiveTopComponent] = useState(0);

  const handleTopComponent = (componentNumber) => {
    setActiveTopComponent(componentNumber);
    setShowRegCard(componentNumber === 0);
  };

  const topNavElements = [
    {
      link: "#",
      element: "OVERVIEW",
      component: <Overview />,
    },
    {
      link: "#",
      element: "PARTICIPANTS",
      component: <Participants />,
    },
    {
      link: "#",
      element: "MATCHES",
      component: <Matches userType="user" viewFlag={true} />,
    },
    {
      link: "#",
      element: "ANNOUNCEMENTS",
      component: <Announcements />,
    },
    {
      link: "#",
      element: "DESCRIPTION",
      component: <Description />,
    },
    {
      link: "#",
      element: "SPONSORS",
      component: <Sponsors />,
    },
  ];

  const [activeTopNav, setActiveTopNav] = useState(0);
  const handleActiveTopNav = (i) => {
    setActiveTopNav(i);
  };
  const [showRegCard, setShowRegCard] = useState(true);


  const topNavDisplay = (border, fontSize) => {
    return topNavElements.map((item, index) => {
      return (
        <li
          key={index}
          className={`nav-item ${fontSize} d-flex justify-content-around me-3${activeTopNav === index ? border : ""
            }`}
        >
          <Link
            onClick={() => {
              handleTopComponent(index);
              handleActiveTopNav(index);
            }}
            className={`nav-link ${activeTopNav === index ? "text-white" : " text-muted"
              }`}
            href={item.link}
          >
            {item.element}
          </Link>
        </li>
      );
    });
  };
  if (loading) {
    return null;
  }
  if (tournamentDetails === null) {
    return <h1>Error 404 ,Page not found</h1>;
  }


  const handleParticipation = () => {
    if (tournamentDetails.registeration_status === "Closed") {
      return; // If registration is closed, do nothing
    }
    // check if user is logged in
    // if not, redirect to login page
    if (userId === null) {
      navigate("/login");
      return;
    }

    // check if user is already participating in the tournament and remove him
    if (participated) {
      axios
        .delete(`/api/tournaments/${id}/participation/${userId}`)
        .then((res) => {
          setParticipated(false);
          setTournamentDetails({ ...tournamentDetails, participants: tournamentDetails.participants.filter(participant => participant.userId !== userId) });
          fetchTournamentDetails();
        })
        .catch((e) => {
          console.error("Error removing user from tournament", e);
        });
      return;
    }

    // add user to tournament
    setShowModal(true);
  };


  // add user to tournament
  const handleConfirm = () => {
    if (name && gameTag && discordTag) {
      // add user to tournament
      const _id = userId;
      axios.post(`/api/tournaments/${id}/participation`, { player: { _id, name, gameTag, discordTag } })
        .then((res) => {
          setParticipated(true);
          setTournamentDetails({ ...tournamentDetails, participants: [...tournamentDetails.participants, res.data] });
          setShowModal(false);
        })
        .catch((e) => {
          console.error("Error adding user to tournament", e);
        });
    } else {
      alert('Please fill in all fields');
    }
  };
  return (
    <React.Fragment>
      <useTournamentDetails.Provider value={tournamentDetails}>

        <div style={{ height: "100vh", overflowY: "auto" }}>
          <div className="d-flex my-5 container org-cont" id="tournament-details-container" >

            <div className="col-md-9 ">
              <h2 className="text-center  pb-3">
                {tournamentDetails.title}

              </h2>
              <div className="card  text-white bg-secondary cont-1  ">
                <div className="card-header border ">
                  <div>
                    <div className="collapse " id="navbarToggleExternalContent">
                      <div className="p-0 d-block d-md-block d-lg-none ">
                        <ul
                          style={{ listStyleType: "none" }}
                          className="card-header-pills   "
                        >
                          {topNavDisplay("", "fs-6")}
                        </ul>
                      </div>
                    </div>
                    <nav className="navbar navbar-dark d-block d-md-block d-lg-none ">
                      <div className="container-fluid ">
                        <button
                          className="navbar-toggler  bg-danger"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#navbarToggleExternalContent"
                          aria-controls="navbarToggleExternalContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          <span className="navbar-toggler-icon" />
                        </button>
                      </div>
                    </nav>
                  </div>

                  <div className="border-bottom d-sm-none d-none d-md-none d-lg-block">
                    <ul className="nav nav-pills card-header-pills my-3 py-2 d-flex justify-content-center ">
                      {topNavDisplay(
                        "border border-danger border-bottom border-4",
                        "fs-6"
                      )}

                      {props.children}
                    </ul>
                  </div>
                  {topNavElements.map((item, index) => {
                    return <React.Fragment key={index}>{activeTopComponent === index && item.component}</React.Fragment>
                  })} <div className="btn-group">
                    <button type="button" className="btn btn-danger">
                      {t("Report")}
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
                      <li><a className="dropdown-item" >{t("Action")}</a></li>
                      <li><a className="dropdown-item" >{t("Another action")}</a></li>
                      <li><a className="dropdown-item" >{t("Something else here")}</a></li>
                      <li>
                        <a className="dropdown-item" onClick={handleReportClick}>
                          {t("Other")} ...
                        </a>
                      </li>
                    </ul>
                  </div>
                  {showReportBox && (
                    <div className="report-box">
                      <textarea className="write-box" placeholder="Write your report here..." />
                      <button className="close-btn" onClick={handleCloseReportBox}>{t("Close")}</button>
                      <button className="submit-btn" onClick={handleOpenReportBox}>{t("Submit")}</button>

                    </div>
                  )}
                </div>
              </div>

            </div>
            {showRegCard &&

              <div className="col-md-3 me-auto ms-4 bg-dark  h-50  rounded border border-danger py-5 " id="participation-container">
                <h3>Registration {tournamentDetails.registeration_status}</h3> {/* Registration status */}
                <p className="mb-4">
                  {tournamentDetails.tournament_status === "Ongoing" ? "Current Round : " + tournamentDetails.currentRound : ""} {/* If tournament is ongoing, show current round */}
                </p>
                <hr className="mx-3 " />
                <h5 className="text-start mt-5 mx-3 mb-4">{`${tournamentDetails.participants.length} / ${tournamentDetails.max_participants}  `}Participants Registered</h5>



                <button
                  className="btn btn-primary ml-3"
                  id={participated ? "participated" : ""}
                  onClick={handleParticipation}
                  disabled={tournamentDetails.registeration_status !== "Opened"} >
                  {
                    participated ? // If user is already participating, and registration is opened, show drop out button
                      tournamentDetails.registeration_status === "Opened" ?
                        "Drop Out" : "Participated" : tournamentDetails.registeration_status === "Opened" ?
                        "Participate" : "Registration Closed"
                  }
                </button>
              </div>
            }
          </div>
          <ParticipatingModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
            name={name} setName={setName}
            gameTag={gameTag} setGameTag={setGameTag}
            discordTag={discordTag} setDiscordTag={setDiscordTag}
          />
          <Footer></Footer>
        </div>


      </useTournamentDetails.Provider>
    </React.Fragment >
  );
};
