import React, { useEffect, useRef, useState } from "react";
import { BasicsForm } from "./componenets/Basics/BasicsForm";
import { InfoForm } from "./componenets/Info/InfoForm";
import { SettingsForm } from "./componenets/Settings/SettingsForm";
import { SupervisorsAndSponsors } from "./componenets/Sponsors/Sponsors";
import { Link, useNavigate, useParams } from "react-router-dom";
import DynamicForm from "./componenets/Dynamic/DynamicForm";
import axios from "axios";

//BY AHMAD HUDHUD

export const TournamentForm = ({ request }) => {
  const [formData, setFormData] = useState({}); //THE MOST IMPORTANT OBJECT , GLOBAL OBJECT FOR WHOLE FORM DATA INPUTS
  const params = useParams();
  const [loading, setLoading] = useState(true); //loading screen to fix component flash
  const [requiredObject, setRequiredObject] = useState(null); //retrive the game object in the craeting tournament case
  //if the request was for editing a tournament , then the tournament object must be retrived

  let intialValidationValuesBasicForm = {};

  const requiredParamsFunction = () => {
    if (request === "CREATE_TOURNAMENT") return "gameName";
    else if (request === "UPDATE_TOURNAMENT") return "tournamentId";
  };
  const _param = requiredParamsFunction();
  const requiredParam = params[_param];
  //based on the requried object , if it was for creating tournament , then the game name is needed ,
  //if the required object were the tournament object , then the pramaeter id will be different
  if (request === "CREATE_TOURNAMENT") {
    intialValidationValuesBasicForm = {
      //for the intial next button to be disabled at first (when there is no formData yet )
      title: "",
      start_date: "",
      start_time: "",
    };
  } //when updating a tournament ,
  // all tournament values from database will be the deafult values for the inputs , so the next button state must be enabled
  else if (request === "UPDATE_TOURNAMENT") {
    intialValidationValuesBasicForm = {};
  }

  useEffect(() => {
    //based on the request , updating or creating a tournament
    if (request === "CREATE_TOURNAMENT") {
      console.log("required param : ", requiredParam);
      axios
        .get(`http://localhost:5000/api/games/${requiredParam}`)
        .then((res) => {
          console.log(res.data);
          setRequiredObject(res.data);
          setLoading(false);
        })
        .catch((e) => {
          console.error("error , game not found", e);

          setLoading(false);
        });
    } else if (request === "UPDATE_TOURNAMENT") {
      console.log("required param : ", requiredParam);
      axios
        .get(`http://localhost:5000/api/tournaments/${requiredParam}`)
        .then((res) => {
          console.log(res.data);
          setRequiredObject(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err, "error, tournament not found");
        });
      setLoading(true);
    }
  }, [requiredParam, request]);
  useEffect(() => {
    setFormData({ ...formData, cover_image_url: undefined });
  }, []);
  const childRef = useRef(); // to call the function in the child component <BasicForm/>
  const [isAgreed, setIsAgreed] = useState(false); //for the publish/save changes dynamic form handling
  const [nav, setNav] = useState(0); //to keep track of navigation stats
  const [nextButtonState, setNextButtonState] = useState(true); // to keep track of next button stats
  const [topActiveNav, setTopActiveNav] = useState(0); //to keep track of next active nav stats (also for styling)
  const [validationErrors, setValidationErrors] = useState({}); //to keep track of the global validation errors object , when empty means there are no errors and the next button will get enabled

  //the next button handler, using handlers is important to not fall with too  many re-render stats problems
  const handleCheckBox = (e) => {
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
  useEffect(() => {
    setFormData({ ...formData, cover_image_url: undefined });
  }, []);

  //the next click handler , set the stats of next button when clicked , timeout = ms to perform immediately
  const nextClickHandler = () => {
    setNav((_navElement) => {
      return _navElement + 1;
    });
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

  const initTournamentObjectValue = {
    //1st page validation
    //game: , //string
    title: undefined,
    start_date: undefined,
    start_time: undefined,
    about: undefined,
    cover_image_url: undefined,
    //2nd page validation
    contact_details: undefined,
    rules: undefined,
    prize: undefined,
    description: undefined,
    schedule: undefined,
    //3rd page validation
    format: "Teams",
    platform: "Combained",
    tournament_status: "Uninitialized",
    registeration_status: "Opened",
    max_participants: 0,
    //4th page validation
    sponsors: [{ brand: "", email: "" }],
    //other attributes related to the tournament object
    organizerID: "8910",
    //sueprvisosr (array of supervisors ids (object ids))
    // organizer id (when logged in)
  };

  //const game_name = requiredObject.name
  //console.log(game_name)
  //================Image uploading and default image features============================
  const handleFileChange = (file) => {
    setFormData({ ...formData, cover_image_url: "" });
  };

  const [image, setImage] = useState("https://i.imgur.com/R8Ze4GS.png");
  useEffect(() => {
    if (request === "UPDATE_TOURNAMENT" && requiredObject) {
      //for the updating request
      console.log("image path :", requiredObject.cover_image_url);
      if (requiredObject.cover_image_url.includes("public\\images\\")) {
        setImage(`http://localhost:3000/${requiredObject.cover_image_url}`);
      } else {
        setImage(requiredObject.cover_image_url);
      }
    }
  }, [setImage, request, requiredObject]);

  const selectedImageHandler = (newImage) => {
    setImage(newImage);
  };
  useEffect(() => {
    if (requiredObject) {
      if (requiredObject.name) {
        initTournamentObjectValue.game = requiredObject.name;
        initTournamentObjectValue.sponsors = [];
        setFormData(initTournamentObjectValue);
      } else if (requiredObject.about) {
        setFormData(requiredObject);
      }
    }
  }, [requiredObject]);

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    console.log(newFormData);
    //console.log(requiredObject);
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
          handleFileChange={handleFileChange}
          image={image}
          setImage={selectedImageHandler}
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
          role="admin"
        />
      ),
    },

    //here pushing the 5th element , might be the publish form or the save form based on the inputs
  ];
  const undefinedAttributeValidation = (att, tournamentObject, fieldName) => {
    if (att !== undefined) {
      return tournamentObject.append(fieldName, att);
    } else if (fieldName === "sponsors") {
      tournamentObject.append(fieldName, "sponsors");
    }
  };
  //assigning optional + required attributes to the tournament object to send to the backend
  // useEffect(()=>{
  //   const newSponsor = JSON.stringify(formData.sponsors)
  //   setFormData({...formData,sponsors:newSponsor})
  // },[])

  const optionalAttributes = [
    { fieldName: "about", attribute: formData.about },
    { fieldName: "rules", attribute: formData.rules },
    { fieldName: "prize", attribute: formData.prize },
    { fieldName: "description", attribute: formData.description },
    { fieldName: "schedule", attribute: formData.schedule },
    { fieldName: "platform", attribute: formData.platform },
    {
      fieldName: "registeration_status",
      attribute: formData.registeration_status,
    },
    { fieldName: "tournament_status", attribute: formData.tournament_status },
    { fieldName: "format", attribute: formData.format },
    //  { fieldName: "sponsors", attribute: newSponsor },
  ];

  const requiredAttributes = [
    { filedName: "game", attribute: formData.game },

    { filedName: "title", attribute: formData.title },
    { filedName: "start_date", attribute: formData.start_date },
    { filedName: "start_time", attribute: formData.start_time },
    { filedName: "cover_image_url", attribute: formData.cover_image_url },
    { filedName: "contact_details", attribute: formData.contact_details },
    { filedName: "max_participants", attribute: formData.max_participants },
  ];
  console.log("sponsors:", formData.sponsors);
  console.log(typeof formData.sponsors);
  const newSponsor = JSON.stringify(formData.sponsors);
  const tournamentObject = new FormData();
  requiredAttributes.map((item, index) => {
    return tournamentObject.append(item.filedName, item.attribute);
  });

  optionalAttributes.map((item, index) => {
    return undefinedAttributeValidation(
      item.attribute,
      tournamentObject,
      item.fieldName
    );
  });

  tournamentObject.append("sponsors", newSponsor); // newSponsor );
  //tournamentObject.append("sponsors",formData.sponsors)
  //const body =JSON.stringify(tournamentObject)

  let SelecetedNavElementButton = null;
  let SelectedNavElement = null;
  if (request === "CREATE_TOURNAMENT") {
    SelectedNavElement = {
      text: "PUBLISH",
      component: (
        <DynamicForm
          tournamentObject={tournamentObject}
          isAgreed={isAgreed}
          setIsAgreed={handleCheckBox}
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
  } else {
    SelectedNavElement = {
      text: "SAVE",
      component: (
        <DynamicForm
          tournamentObject={tournamentObject}
          isAgreed={isAgreed}
          setIsAgreed={handleCheckBox}
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
          Save
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

  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  if (loading) {
    return null;
  }
  if (!requiredObject) {
    return <h1>ERROR 404</h1>;
  }
  return (
    <React.Fragment>
      <div className=" tournament-form-container">
        <div className=" container  nested-tournament-form-container ">
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
                {nav === 0 ? (
                  <button
                    type="button"
                    className="btn btn-danger me-auto "
                    onClick={backHandler}
                    disabled={nav !== 0}
                  >
                    Back
                  </button>
                ) : (
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
      </div>
      {/* <button onClick= {()=>console.log(errors)}> Delta button</button> */}
    </React.Fragment>
  );
};
