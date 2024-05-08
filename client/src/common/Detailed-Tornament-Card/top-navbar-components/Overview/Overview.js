import React, { useContext } from "react";
import { useState } from "react";
import { Details } from "../../bottom-navbar-components/Details/Details";
import { Prizes } from "../../bottom-navbar-components/Prizes/Prizes";
import { Rules } from "../../bottom-navbar-components/Rules/Rules";
import { Schedule } from "../../bottom-navbar-components/Schedule/Schedule";
import { Contact } from "../../bottom-navbar-components/Contact/Contact";
import { About } from "../../bottom-navbar-components/About/About";
import { useTournamentDetails } from "../..";

export const Overview = () => {
  const tournamentDetails = useContext(useTournamentDetails)
  const bottomNavElements = [
    { link: "#", element: "DETAILS", component: <Details/> },
    { link: "#", element: "RULES", component: <Rules/> },
    { link: "#", element: "PRIZES", component: <Prizes/> },
    { link: "#", element: "SCHEDULE", component: <Schedule/> },
    { link: "#", element: "CONTACT", component: <Contact/> },
    { link: "#", element: "ABOUT", component: <About/> },
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
      <div className="my-4 py-2 d-flex justify-content-center">
        <img
          style={{ height: "30%", width: "70%" }}
          src={tournamentDetails.cover_image_url}
          className="card-img-top"
          alt="..."
        />{" "}
      </div>
      <div className="card-header   ">
        <ul className="nav nav-pills card-header-pills my-3 d-flex justify-content-center ">
          {bottomNavElements.map((item, index) => {
            return (
              <li
                key={index}
                className={`nav-item  ${
                  activeBottomNav === index
                    ? "active border-bottom border-4 border-light"
                    : ""
                }`}
              >
                <a
                  onClick={() => {
                    handleBottomComponent(index);
                    handleActiveBottomNav(index);
                  }}
                  className={`nav-link ${
                    activeBottomNav === index ? "fs-5 text-white" : " fs-5 text-muted"
                  }`}
                  href={item.link}
                >
                  {item.element}
                </a>
              </li>
            );
          })}
        </ul>
        <hr></hr>
        {bottomNavElements.map(
          (item, index) => activeBottomComponent === index && item.component
        )}
      </div>
    </React.Fragment>
  );
};
