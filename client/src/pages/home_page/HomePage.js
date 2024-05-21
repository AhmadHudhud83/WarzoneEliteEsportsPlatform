import React, { useState, useEffect } from "react";
import { TournamentCard } from "../../common/tournament_card/TournamentCard";
import axios from "axios"; //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)
import Footer from "../../common/Footer/Footer";
import Carousel from "./components/carousel_component/Carousel";
import SideBar from "../../common/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
export const HomePage = () => {
  const navigate = useNavigate();
  const [gameNames,setgameNames] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/api/games/names").then((res)=>{
      console.log(res.data)
      setgameNames(res.data)
    }).catch((err)=>console.error(err))
  },[])


  const filtersArr = [
    { index: "By Game", icon: "#", options:gameNames },
    { index: "By Format", icon: "#", options: ["1v1", "Teams"] },
  ];
  const [tournaments, setTournaments] = useState([{}]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tournaments/allTournaments")
      .then((res) => {
        console.log(res.data);
        setTournaments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const homePageSideBarElements = [{ label: "Home", link: "/", icon: <></> },
  { label: "Contact Us ", link: "/", icon: <></> },
  { label: " Feedback Center", link: "/", icon: <></> },
  { label: "My Tournaments", link: "/", icon: <></> },
  { label: "Sign up", link: "/", icon: <></> },
];

  return (
    <React.Fragment>
      <React.Fragment>
        <div className="container">
          <SideBar
            sideBarTitle={
              <div     style={{ cursor: "pointer" }}
                onClick={() => navigate("/")} >
               <h5
           
                className="text-white "
              >
                   <img src="https://i.imgur.com/Rc2QkPh.png" height={100} width={100} className="img-fluid" alt="..." />
                Warzone Elite
              </h5>
      

              
              </div>
             
            }
            elementsList={homePageSideBarElements}
          />
          <Carousel></Carousel>

          <h2 className="text-start py-4">Find tournaments</h2>
          <div className="d-flex justify-content-end">
            {filtersArr.map((i, e) => (
              <>
                <select
                  className={`form-select mx-3 bg-dark border text-white `}
                  aria-label="Default select example"
                  style={{ width: "15%" }}
                >
                  <option selected disabled>{i.index}</option>
                  {i.options.map((_option, _index) => {
                    return <option value={_index}>{_option}</option>;
                  })}
                </select>
              </>
            ))}
          </div>

          <div className="row row-cols-1 row-cols-md-3 gx-0 px-0 mx-0  my-4  ">
            {tournaments.map((tournament, index) => {
              return (
                <TournamentCard key={index} tournament={tournaments[index]} />
              );
            })}
          </div>
        </div>
        <Footer />
      </React.Fragment>
      <Footer />
    </React.Fragment>
  );
};
