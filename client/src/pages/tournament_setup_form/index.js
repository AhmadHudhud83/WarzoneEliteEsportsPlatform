import React, { useEffect, useRef, useState } from "react";
import { BasicsForm } from "./componenets/Basics/BasicsForm";
import { InfoForm } from "./componenets/Info/InfoForm";
import { SettingsForm } from "./componenets/Settings/SettingsForm";
import { SupervisorsAndSponsors } from "./componenets/Supervisors_Sponsors/SupervisorsAndSponsors";
import { Link, useNavigate, useParams } from "react-router-dom";
import PublishForm from "./componenets/Dynamic/DynamicForm";

//BY AHMAD HUDHUD

export const TournamentSetupForm = ({ request }) => {
  const [formData, setFormData] = useState({}); //THE MOST IMPORTANT OBJECT , GLOBAL OBJECT FOR WHOLE FORM DATA INPUTS
  const params = useParams();
  const [loading, setLoading] = useState(true); //loading screen to fix component flash
  const [requiredObject, setRequiredObject] = useState(null); //retrive the game object in the craeting tournament case
  //if the request was for editing a tournament , then the tournament object must be retrived

  let intialValidationValuesBasicForm = {};
  let requiredParam =  params[request.requiredParam] //based on the requried object , if it was for creating tournament , then the game name is needed , 
  //if the required object were the tournament object , then the pramaeter id will be different
  if (request.type === "CREATE_TOURNAMENT") {
   
    intialValidationValuesBasicForm = { //for the intial next button to be disabled at first (when there is no formData yet )
      title: "",
      start_date: "",
      start_time: "",
    }
    
    

  }//when updating a tournament ,
    // all tournament values from database will be the deafult values for the inputs , so the next button state must be enabled
  else if(request.type==="UPDATE_TOURNAMENT"){

    intialValidationValuesBasicForm={} ;
    
  }


  useEffect(() => {
    request.getFunction(requiredParam, setRequiredObject, setLoading);
  }, [requiredParam, request]);

  const childRef = useRef(); // to call the function in the child component <BasicForm/>
  const [isAgreed, setIsAgreed] = useState(false); //for the publish/save changes dynamic form handling
  const [nav, setNav] = useState(0); //to keep track of navigation stats
  const [nextButtonState, setNextButtonState] = useState(true); // to keep track of next button stats
  const [topActiveNav, setTopActiveNav] = useState(0); //to keep track of next active nav stats (also for styling)
  const [validationErrors, setValidationErrors] = useState({}); //to keep track of the global validation errors object , when empty means there are no errors and the next button will get enabled

  //the next button handler, using handlers is important to not fall with too  many re-render stats problems
  const handlePublishCheckBox = (e) => {
    setIsAgreed(e.target.checked);
  };
  const nextButtonHandler = (bool) => {
    setNextButtonState(bool);
  };
  const validationErrorsHandler = (newValidationErrors) => {
    setValidationErrors((prevErrors) => {
      const anyErrors = Object.keys(validationErrors).length > 0;
      nextButtonHandler(anyErrors);

      return newValidationErrors;
    });
    console.log(newValidationErrors);
  };

  useEffect(() => {
    const hasErrors = Object.keys(validationErrors).length > 0;
    setNextButtonState(hasErrors);
  }, [validationErrors]);

  //validation handler of global object...

  useEffect(() => {
    validationErrorsHandler(intialValidationValuesBasicForm);
    console.log("CHILDREEN ", request);
  }, []);

  //the next click handler , set the stats of next button when clicked , timeout = ms to perform immediately
  const nextClickHandler = () => {
    setNav((_navElement) => {
      return _navElement + 1;
    })
    setTopActiveNav((_topElement) => _topElement + 1);

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
  //   sponsors: [{ brand: "", email: "" }],
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

  useEffect(() => {
    if (requiredObject) {
      if (requiredObject.name) {
        setFormData({ game: requiredObject.name,sponsors:[]} );
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

  let SelecetedNavElementButton = null;
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
          validationErrors={validationErrors}
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
