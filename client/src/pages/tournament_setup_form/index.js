import React, { useEffect, useRef, useState } from "react";
import { BasicsForm } from "./componenets/Basics/BasicsForm";
import { InfoForm } from "./componenets/Info/InfoForm";
import { SettingsForm } from "./componenets/Settings/SettingsForm";
//import { PublishForm } from "./componenets/Publish/PublishForm";
import { SupervisorsAndSponsors } from "./componenets/Supervisors_Sponsors/SupervisorsAndSponsors";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PublishForm from "./componenets/Dynamic/DynamicForm";

//BY AHMAD HUDHUD

export const TournamentSetupForm = ({ request }) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [requiredObject, setRequiredObject] = useState(null); //retrive the game object in the craeting tournament case
  //if the request was for editing a tournament , then the tournament object must be retrived
  let intialValidationValuesBasicForm = {}
  let requiredParam = null;
  if (request.type === "CREATE_TOURNAMENT") {
    requiredParam = params[request.requiredParam];
    intialValidationValuesBasicForm={ title: "",
    start_date: "",
    start_time: "",}
  } //to get the game name from url (after selecting a game)
  useEffect(() => {
    request.getFunction(requiredParam, setRequiredObject, setLoading);
  }, [requiredParam, request]);

  const [isAgreed, setIsAgreed] = useState(false);
  
  const childRef = useRef(); // to call the function in the child component <BasicForm/>
  const [nav, setNav] = useState(0); //to keep track of navigation stats
  const [nextButtonState, setNextButtonState] = useState(true); // to keep track of next button stats
  const [topActiveNav, setTopActiveNav] = useState(0); //to keep track of next active nav stats (also for styling)
  const [validationErrors, setValidationErrors] = useState({}); //to keep track of the global validation errors object , when empty means there are no errors and the next button will get enabled

  //the next button handler, using handlers is important to not fall with too  many re-render stats problems
  const handlePublishCheckBox = (e) => {
    setIsAgreed(e.target.checked);
  };

  useEffect(() => {
    const hasErrors = Object.keys(validationErrors).length > 0;
    setNextButtonState(hasErrors);
  }, [validationErrors]);
  const nextButtonHandler = (bool) => {
    setNextButtonState(bool);
  };
  //validation handler of global object...
  const validationErrorsHandler = (newValidationErrors) => {
    setValidationErrors((prevErrors) => {
      const anyErrors = Object.keys(validationErrors).length > 0;
      nextButtonHandler(anyErrors);

      return newValidationErrors;
    });
    console.log(newValidationErrors);
  };
  useEffect(() => {
    setValidationErrors(intialValidationValuesBasicForm);
    console.log("CHILDREEN ", request);
  }, []);

  //the next click handler , set the stats of next button when clicked , timeout = ms to perform immediately
  const nextClickHandler = () => {
    setNav((_nav) => {
      return _nav + 1;
    });
    setTopActiveNav((_top) => _top + 1);

    //setNextButtonState(true);
    setNextButtonState(Object.keys(validationErrors).length > 0);
    console.log(validationErrors);
  };
  //same for previous click handler..
  const prevClickHandler = () => {
    setValidationErrors({});
    setNav((n) => {
      return n - 1;
    });
    setTopActiveNav((t) => t - 1);
    // setNextButtonState(false);
  };

  //tournament (form) object intialaized

  //  const initTournamentObjectValue = {
  //   //1st page validation
  //   game: gameName, //string
  //   title: "",
  //   start_date: "",
  //   start_time: "",
  //   about: "",
  //   //2nd page validation
  //   contact_details: "",
  //   rules: "",
  //   prize: "",
  //   description: "",
  //   schedule: "",
  //   //3rd page validation
  //   format: "Teams",
  //   platform: "",
  //   tournament_status: "Opened",
  //   registeration_status: "Opened",
  //   max_participants: 0,
  //   //4th page validation
  //   sponsors: { brand: "", email: "" },
  //   //other attributes related to the tournament object
  //   announcements: ["hi", "bye"],
  //   supervisors : ["123","456"],
  //   organizerID:"8910",
  //   //sueprvisosr (array of supervisors ids (object ids))
  //  // organizer id (when logged in)
  //   cover_image_url:"https://i.imgur.com/CqiHFdW.png"
  // }

  //const game_name = requiredObject.name
  //console.log(game_name)

  const [formData, setFormData] = useState({}); //THE MOST IMPORTANT OBJECT , GLOBAL OBJECT FOR WHOLE FORM DATA INPUTS
  useEffect(() => {
    if (requiredObject) {
      if (requiredObject.name) {
        setFormData({ game: requiredObject.name });
      } else if (requiredObject.about) {
        setFormData(requiredObject);
      }
    }
  }, [requiredObject]);

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    console.log(newFormData);
    console.log(requiredObject);
  };
  const NavElements = [
    {
      text: "BASICS",
      component: (
        <BasicsForm
          formData={formData}
          setFormData={handleFormChange}
          setValidationErrors={validationErrorsHandler}
          validationErrors={validationErrors}
          intialValidationValuesBasicForm={intialValidationValuesBasicForm}
        />
      ),
    },
    {
      text: "INFO",
      component: (
        <InfoForm
          formData={formData}
          setFormData={handleFormChange}
          setValidationErrors={validationErrorsHandler}
          validationErrors={validationErrors}
          setNextButtonState={nextButtonHandler}
        />
      ),
    },
    {
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

    //here pushing the 5th element , might be the publish form or the save form based on the inputs
  ];

  let SelecetedNavElementButton = null
  let SelectedNavElement = null;
  if (request.type === "CREATE_TOURNAMENT") {
    SelectedNavElement = {
      text: "PUBLISH",
      component: (
        <PublishForm
          formData={formData}
          isAgreed={isAgreed}
          setIsAgreed={handlePublishCheckBox}
          ref={childRef}
          request={request}
        />
      ),
    };
    NavElements[4] = SelectedNavElement;
    SelecetedNavElementButton = () => {
      return (
        <button
          type="button"
          className="btn btn-danger ms-auto position-relative bottom-0 end-0"
          disabled={!isAgreed}
          onClick={() => {
            childRef.current.handleShowModal();
          }}
        >
          Publish
        </button>
      );
    };
  }
  

  //   if(children[0].text==="PUBLISH"){
  //     SelectedNavElementForm =React.Children.map(children[0].component,child=>{
  //     if(React.isValidElement(child)){

  //       return React.cloneElement(child,{formData:formData,isAgreed:isAgreed,setIsAgreed:handlePublishCheckBox,ref:childRef})

  //     }
  //     return child
  //   })
  //   const SelectedElement = {text:children[0].text,component:SelectedNavElementForm}
  //   NavElements[4]=SelectedElement
  //   SelecetedNavElementButton = ()=>{

  //   }

  // }else if(children[0].text==="SAVE CHANGES"){
  // const SelectedElement = children[0]
  // NavElements[4]=SelectedElement
  // SelecetedNavElementButton=()=>{
  //   return<button>SAVE AND CHANGES BABAY</button>
  // }

  // }
  //navbar elements , by label and component, also passing the needed data for them as props like form data , and validation errors to keep the track of them inside the child components

  // a function to display the componenet based in the nav stats (using nav as an index)
  const NavDisplay = () => {
    return NavElements[nav].component;
  };

  //navItems function for re-useablitiy , since we gonna render whole nav components once for large screens , and in collapse toggle button in meduim and small screen cases, styling is different for each case
  const navItems = (border, fontSize) => {
    return NavElements.map((item, index) => (
      <li
        key={index}
        className={`nav-item ${fontSize} mx-3${
          topActiveNav === index ? border : ""
        }`}
      >
        <Link
          onClick={() => {}}
          className={`nav-link ${
            topActiveNav === index ? "text-white" : "text-muted"
          }`}
          to="#"
        >
          {item.text}
        </Link>
      </li>
    ));
  };

  if (loading) {
    return null;
  }
  if (!requiredObject) {
    return <h1>ERROR 404</h1>;
  }
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
              {nav === NavElements.length - 1 &&
                (SelecetedNavElementButton === null ? (
                  <></>
                ) : (
                  <SelecetedNavElementButton />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick= {()=>console.log(errors)}> Delta button</button> */}
    </React.Fragment>
  );
};
