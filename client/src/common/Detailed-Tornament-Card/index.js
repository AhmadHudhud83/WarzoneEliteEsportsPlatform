import React, { createContext, useEffect, useState } from "react";
import "./style.css";
import { Overview } from "./top-navbar-components/Overview/Overview";
import { Participants } from "./top-navbar-components/Participants/Participants";
import { Matches } from "./top-navbar-components/Matches/Matches";
import { Announcements } from "./top-navbar-components/Announcements/Announcements";
import Footer from "../Footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Description } from "./top-navbar-components/Description/Description";
import axios from "axios";
import Sponsors from "./top-navbar-components/Sponsors/Sponsors";
import ParticipatingModal from "../participating_modal/ParticipatingModal";
export const useTournamentDetails = createContext();

export const DetailedTournamentCard = (props) => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };
  const [loading, setLoading] = useState(true);
  const [tournamentDetails, setTournamentDetails] = useState(null);
  const { id } = useParams();
  const userId = "664cd8ea90ec080145afa148";
  const [participated, setParticipated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [gameTag, setGameTag] = useState('');
  const [discordTag, setDiscordTag] = useState('');

  useEffect(() => {
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
        console.error("Error returning back the tournament details", e);
        setLoading(false);
      });
  }, [id]);


  const [activeTopComponent, setActiveTopComponent] = useState(0);

  const handleTopComponent = (componentNumber) => {
    setActiveTopComponent(componentNumber);
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
    // {
    //   link: "#",
    //   element: "MATCHES",
    //   component: (
    //     <Matches

    //     />
    //   ),
    // },
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

  const topNavDisplay = (border, fontSize) => {
    return topNavElements.map((item, index) => {
      return (
        <li
          key={index}
          className={`nav-item ${fontSize} mx-3${activeTopNav === index ? border : ""
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

  // handle participation button click which checks if user is logged in and then adds or removes user from tournament
  const handleParticipation = () => {
    if (tournamentDetails.registeration_status === "Closed") {
      return;
    }
    // check if user is logged in
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
        <ParticipatingModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
          name={name} setName={setName}
          gameTag={gameTag} setGameTag={setGameTag}
          discordTag={discordTag} setDiscordTag={setDiscordTag}
        />
        <div className="row" id="tournament-details-container">
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
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
                  <nav className="navbar navbar-dark d-block d-md-block d-lg-none">
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
                  <ul className="nav nav-pills card-header-pills my-3 py-2 d-flex justify-content-center">
                    {topNavDisplay(
                      "border border-danger border-bottom border-4",
                      "fs-5"
                    )}

                    {props.children}
                  </ul>
                </div>
                {topNavElements.map((item, index) => {
                  return <React.Fragment key={index}>{activeTopComponent === index && item.component}</React.Fragment>
                })}
              </div>
            </div>

          </div>
          <div className="col-md-3" id="participation-container">
            <h3>Registration {tournamentDetails.registeration_status}</h3>
            <p>
              {tournamentDetails.tournament_status === "Ongoing" ? "Current Round : " + tournamentDetails.currentRound : ""}
            </p>
            <button
              className="btn btn-primary ml-3"
              id={participated ? "participated" : ""}
              onClick={handleParticipation}
              disabled={tournamentDetails.registeration_status !== "Opened"} >
              {
                participated ?
                  tournamentDetails.registeration_status === "Opened" ?
                    "Drop Out" : "Participating" : tournamentDetails.registeration_status === "Opened" ?
                    "Participate" : "Registration Closed"
              }
            </button>
          </div>
        </div>

        <Footer></Footer>
      </useTournamentDetails.Provider>
    </React.Fragment>
  );
};
