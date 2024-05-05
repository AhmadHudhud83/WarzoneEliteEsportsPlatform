import React, { useEffect, useRef, useState } from "react";
import { BasicsForm } from "./componenets/Basics/BasicsForm";
import { InfoForm } from "./componenets/Info/InfoForm";
import { SettingsForm } from "./componenets/Settings/SettingsForm";
import { PublishForm } from "./componenets/Publish/PublishForm";
import { SupervisorsAndSponsors } from "./componenets/Supervisors_Sponsors/SupervisorsAndSponsors";
import { useParams } from "react-router-dom";
//BY AHMAD HUDHUD

export const TournamentSetupForm = (props) => {
  const childRef = useRef() // to call the function in the child component <BasicForm/>
  const [nav, setNav] = useState(0) //to keep track of navigation stats
  const [nextButtonState, setNextButtonState] = useState(true) // to keep track of next button stats
  const [topActiveNav, setTopActiveNav] = useState(0) //to keep track of next active nav stats (also for styling)
  const [validationErrors, setValidationErrors] = useState({title:""}) //to keep track of the global validation errors object , when empty means there are no errors and the next button will get enabled
  const { game } = useParams()//to get the game name from url (after selecting a game)
  //the next button handler, using handlers is important to not fall with too  many re-render stats problems

  const nextButtonHandler = (bool) => {
    setNextButtonState(bool)
  }
  //validation handler of global object...
  const validationErrorsHandler = (newValidationErrors) => {
    setValidationErrors(newValidationErrors)
    console.log(newValidationErrors)
    const anyErrors = Object.keys(validationErrors).length > 0;
    nextButtonHandler(anyErrors)
    console.log(anyErrors)
  };

 

  //the next click handler , set the stats of next button when clicked , timeout = ms to perform immediately
  const nextClickHandler = () => {
    setTimeout(() => {
      setNav((_nav) => _nav + 1);
      setTopActiveNav((_top) => _top + 1);
    }, 0);
    //setNextButtonState(true);
    console.log(validationErrors);
  }
  //same for previous click handler..
  const prevClickHandler = () => {
    setNav((n) => n - 1);
    setTopActiveNav((t) => t - 1);
    //setNextButtonState(false);
    setValidationErrors({})
   
  };

  //tournament (form) object intialaized
  const initTournamentObjectValue = {
    //1st page validation
    game: game, //string
    title: "",
    start_date: "",
    start_time: "",
    about: "",
    //2nd page validation
    contact_details: "",
    rules: "",
    prize: "",
    description: "",
    schedule: "",
    //3rd page validation
    format: "",
    platform: "",
    tournament_status: "",
    registeration_status: "",
    max_participants: 0,
    //4th page validation
    sponsors: { brand: "", email: "" },
    //other attributes related to the tournament object
    announcements: ["hi", "bye"],
    //sueprvisosr (array of supervisors ids (object ids))
    //organizer id (when logged in)
  };

  const [formData, setFormData] = useState(initTournamentObjectValue) //THE MOST IMPORTANT OBJECT , GLOBAL OBJECT FOR WHOLE FORM DATA INPUTS

  //the function to handle any form change
  const handleFormChange = (newFormData) => { 
    setFormData(newFormData)
    console.log(newFormData)
  }
//navbar elements , by label and component, also passing the needed data for them as props like form data , and validation errors to keep the track of them inside the child components
  const NavElements = [
    {
      link: "#",
      text: "BASICS",
      component: (
        <BasicsForm
          formData={formData}
          setFormData={handleFormChange}
          setValidationErrors={validationErrorsHandler}
          validationErrors={validationErrors}
        />
      ),
    },
    {
      link: "#",
      text: "INFO",
      component: (
        <InfoForm
          formData={formData}
          setFormData={handleFormChange}
          setValidationErrors={validationErrorsHandler}
          validationErrors={validationErrors}
        />
      ),
    },
    {
      link: "#",
      text: "SETTINGS",
      component: (
        <SettingsForm
          formData={formData}
          setFormData={handleFormChange}
          setValidationErrors={validationErrorsHandler}
          validationErrors={validationErrors}
        />
      ),
    },
    {
      link: "#",
      text: "SUPERVISORS & SPONSORS",
      component: (
        <SupervisorsAndSponsors
          formData={formData}
          setFormData={handleFormChange}
          setValidationErrors={validationErrorsHandler}
          validationErrors={validationErrors}
        />
      ),
    },
    {
      link: "#",
      text: "PUBLISH",
      component: (
        <PublishForm
          formData={formData}
          setFormData={handleFormChange}
          ref={childRef}
        />
      ),
    },
  ]

  // a function to display the componenet based in the nav stats (using nav as an index)
  const NavDisplay = () => {
    return NavElements[nav].component
  }

  //navItems function for re-useablitiy , since we gonna render whole nav components once for large screens , and in collapse toggle button in meduim and small screen cases, styling is different for each case
  const navItems = (border, fontSize) => {
    return NavElements.map((item, index) => (
      <li
        key={index}
        className={`nav-item ${fontSize} mx-3${
          topActiveNav === index ? border : ""
        }`}
      >
        <a
          onClick={() => {}}
          className={`nav-link ${
            topActiveNav === index ? "text-white" : "text-muted"
          }`}
          href={item.link}
        >
          {item.text}
        </a>
      </li>
    ));
  };

  return (
    <React.Fragment>
  
      <div className="container pt-5 mt-3 org-cont">
        <div className="card text-white bg-secondary  cont-1">
          <div className="card-header border ">
            <div className="border-bottom d-sm-none d-none d-md-none d-lg-block ">
              <ul className="nav nav-pills card-header-pills my-3 py-2 d-flex justify-content-center">
                {navItems(
                  "active border-bottom border-4 border-danger",
                  "fs-5"
                )}
              </ul>
            </div>
            <div>
              <div className="collapse " id="navbarToggleExternalContent">
                <div className="p-0 d-block d-md-block d-lg-none">
                  <ul
                    style={{ listStyleType: "none" }}
                    className="card-header-pills    "
                  >
                    {navItems("", "fs-6")}
                  </ul>
                </div>
              </div>
              <nav className="navbar navbar-dark d-block d-md-block d-lg-none">
                <div className="container-fluid ">
                  <button
                    className="navbar-toggler"
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
            {/* <BasicsForm formData={formData} setFormData={handleFormChange} /> */}
            {NavDisplay()}

            <div className="d-flex ">
              {/* THE BUTTON STATS LOGIC */}
              {nav !== 0 && (
                <button
                  type="button"
                  className="btn btn-danger me-auto "
                  onClick={() => {
                    prevClickHandler();
                  }}
                  disabled={nav === 0}
                >
                  Previous
                </button>
              )}
              {nav < NavElements.length - 1 && (
                <button
                  type="button"
                  className="btn btn-danger  position-relative ms-auto "
                  onClick={() => {
                    nextClickHandler();
                  }}
                  disabled={nextButtonState}
                >
                  Next
                </button>
              )}
              {/*PUBLISH BUTTON LOGIC , CONSIDER THE handleShowModal() from the child component <PublishForm/> */}
              {nav === NavElements.length - 1 && (
                <button
                  type="button"
                  className="btn btn-danger ms-auto position-relative bottom-0 end-0"
                  onClick={() => {
                    childRef.current.handleShowModal();
                  }}
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick= {()=>console.log(errors)}> Delta button</button> */}
    </React.Fragment>
  );
};
