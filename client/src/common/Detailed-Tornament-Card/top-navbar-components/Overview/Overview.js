import React, { useContext,useEffect } from "react";
import { useState } from "react";
import { Details } from "../../bottom-navbar-components/Details/Details";
import { Prizes } from "../../bottom-navbar-components/Prizes/Prizes";
import { Rules } from "../../bottom-navbar-components/Rules/Rules";
import { Schedule } from "../../bottom-navbar-components/Schedule/Schedule";
import { Contact } from "../../bottom-navbar-components/Contact/Contact";

import { useTournamentDetails } from "../..";

export const Overview = () => {
  

  const tournamentDetails = useContext(useTournamentDetails);
  const [image, setImage] = useState("https://i.imgur.com/R8Ze4GS.png");
  useEffect(() => {
    
    console.log("image path :", tournamentDetails.cover_image_url);
    if(tournamentDetails.cover_image_url.includes("public\\images\\")){
      setImage(`http://localhost:3000/${tournamentDetails.cover_image_url}`)
    }else{
      setImage(tournamentDetails.cover_image_url);
    }
    
  }
, []);
  const bottomNavElements = [
    { element: "CONTACT", component: <Contact /> },
    { element: "DETAILS", component: <Details /> },
    { element: "RULES", component: <Rules /> },
    { element: "PRIZES", component: <Prizes /> },
    { element: "SCHEDULE", component: <Schedule /> },
  ];

  const [activeBottomComponent, setActiveBottomComponent] = useState(0);

  const handleBottomComponent = (componentNumber) => {
    setActiveBottomComponent(componentNumber);
  };
  const [activeBottomNav, setActiveBottomNav] = useState(0);
  const handleActiveBottomNav = (i) => {
    setActiveBottomNav(i);
  };

  return (
    <React.Fragment>
      <div className="my-3  d-flex justify-content-around rounded ">
        <img
          height={600}
          width={300}
          src={image}
          className="card-img-top"
          alt="..."
        />{" "}
      </div>
      <div className="card-header   ">
        <div className=" p-5">
          <h4>ABOUT</h4>
          <hr />

          <p className="text-muted mt-3">{tournamentDetails.about}</p>
        </div>

        <ul className="nav nav-pills card-header-pills my-3 d-flex justify-content-center  ">
          {bottomNavElements.map((item, index) => {
            return (
              <li
                style={{ cursor: "pointer" }}
                key={index}
                className={`nav-item  ${
                  activeBottomNav === index
                    ? "active border-bottom border-4 border-light"
                    : ""
                }`}
              >
                <p
                  onClick={() => {
                    handleBottomComponent(index);
                    handleActiveBottomNav(index);
                  }}
                  className={`nav-link ${
                    activeBottomNav === index
                      ? "fs-5 text-white"
                      : " fs-5 text-muted"
                  }`}
                >
                  {item.element}
                </p>
              </li>
            );
          })}
        </ul>
        <hr></hr>
        {bottomNavElements.map(
          (item, index) => <React.Fragment key={index}>{activeBottomComponent === index && item.component}</React.Fragment>
        )}
      </div>
  
    </React.Fragment>
  );
};
