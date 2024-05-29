import React, { useState, useEffect } from "react";
import { TournamentCard } from "../../common/tournament_card/TournamentCard";
import axios from "axios"; //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)
import Footer from "../../common/Footer/Footer";
import Carousel from "./components/carousel_component/Carousel";
import SideBar from "../../common/SideBar/SideBar";
import BottomBar from "../../common/bottomBar/BottomBar.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import "./HomePage.css";

export const HomePage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate();
  const [gamesData, setGamesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTournaments, setTotalTournaments] = useState(0);
  const [selectedGame, setSelectedGame] = useState('');

  const selectGameHandler = (game) => {
    //handle selected game
    setSelectedGame(game.name);
    setPage(1);
  };
  useEffect(() => {
    //fetch the games data (selected imgUrl and game name only)
    axios
      .get("http://localhost:5000/api/games/names-urls")
      .then((res) => {
        console.log(res.data);
        setGamesData(res.data);

        selectGameHandler(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const [tournaments, setTournaments] = useState([]);
  //fetch the tournament data using  async load more button for better performance and optimization  (6 elements atmost)
  useEffect(() => {

    axios
      .get(
        `http://localhost:5000/api/tournaments/paginated-by-game?page=${page}&gameName=${selectedGame}`
      )
      .then((res) => {
        if (page === 1) {
          console.log(res.data);
          setTournaments(res.data.tournaments);
        } else {
          setTournaments((new_tournament) => [
            ...new_tournament,
            ...res.data.tournaments,
          ]); //add the incoming tournament data and added to the current array state using state callback
        }
        if (selectedGame !== "") {
          setTotalTournaments(res.data.totalTournaments);//if selected game not set yet , then dont set the total tournaments length , otherwise it will bug the load more button
        }


      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedGame, page]); // if selectedGame or page have been changed , then fetch the new data

  const loadMoreHandler = () => {
    setPage((pB) => pB + 1);
  };

  //side bar elements
  const homePageSideBarElements = [
    {
      label: t("Home"),
      link: "/",
      icon: <i className="me-2 fa-solid fa-house" />,
    },
    {
      label: t("Contact Us"),
      link: "/contact",
      icon: <i className="me-2 fa-solid fa-phone" />,
    },
    {
      label: t("Feedback Center"),
      link: "/feedback-center",
      icon: <i className="me-2 fa-solid fa-comments" />,
    },
    {
      label: t("Joined Tournaments"),
      link: "/joined-tournaments",
      icon: <i className="me-2 fa-solid fa-server" />,
    },
    {
      label: t("Sign up"),
      link: "/sign-up",
      icon: <i className=" me-2 fa-solid fa-right-to-bracket" />,
    },
  ];

  return (
    <React.Fragment>
      <div className="home-page">

        <div className="container ">
          <SideBar
            sideBarTitle={
              <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                <h5 className="text-white ">
                  <img
                    src="https://i.imgur.com/Rc2QkPh.png"
                    height={100}
                    width={100}
                    className="img-fluid"
                    alt="..."
                  />
                  Warzone Elite
                </h5>
              </div>
            }
            elementsList={homePageSideBarElements}
          />

          <Carousel />
          <h2 className="text-start pt-4  mb-0">Find tournaments</h2>
          <div className="d-flex justify-content-end">
            <BottomBar
              gamesData={gamesData}
              setSelectedGame={selectGameHandler}
              selectedGame={selectedGame}
            />
          </div>

          <div className="row row-cols-1 row-cols-md-3 gx-0 px-0 mx-0  my-4  ">
            {tournaments.map((tournament, index) => {
              return <TournamentCard key={index} tournament={tournament} />;
            })}
          </div>
          <div className="d-flex justify-content-center ">
            {typeof tournaments[0] === "undefined" ? (
              <h3 className="text-white my-5 ">
                {t("No available tournaments for this game...")}
              </h3>
            ) : tournaments.length >= 6 &&
              tournaments.length < totalTournaments ? (
              <button onClick={loadMoreHandler} className="btn btn-danger mb-5">
                {t("Load more")}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
