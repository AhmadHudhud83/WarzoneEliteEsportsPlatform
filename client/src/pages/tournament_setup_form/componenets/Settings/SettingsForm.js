import React, { useEffect, useState, useRef } from "react";
import "../../style.css";
export const SettingsForm = ({
  formData,
  setFormData,
  setValidationErrors,
  validationErrors,
  request
}) => {
  //focus on the required input
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const SelectedInputs = [
    {
      label: "Format",
      name: "format",
      option1: "Teams",
      option2: "1v1",
      id1: 44,
      id2: 45,
    },

    {
      label: "Registeration Status",
      name: "registeration_status",
      option1: "Opened",
      option2: "Closed",
      id1: 46,
      id2: 47,
    },

    {
      label: "Tournament Status",
      name: "tournament_status",
      option1: "Uninitialized",
      option2: "Finished",
      option3: "Ongoing",
      id1: 48,
      id2: 49,
      id3:50
    },
  ];
  const platformOptions = ["PC", "Console", "Mobile", "Combained"];

  const handleMaxParticipantsChange = (e) => {
    const value = e.target.value;

    const updatedFormData = { ...formData, [e.target.name]: value };
    setFormData(updatedFormData);
    console.log(updatedFormData);
  };
  const platformInputChangeHandler = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData); //for the default selected input
    console.log(updatedFormData);

    //  console.log(updatedFormData);
  };
  //handling checkboxes
  const checkBoxesChangeHandler = (e, optionValue) => {
    const name = e.target.name;
    const updatedFormData = { ...formData, [name]: optionValue };

    setFormData(updatedFormData);
    console.log("UPDATED FORM DATA: ",updatedFormData)

    //console.log(`validation error of ${e.target.name} is :  `,validationErrors[e.target.name])
    if (validationErrors[e.target.name]) {
      delete validationErrors[e.target.name];
    }
  };
  //handling max-participants validation
  const handleMaxParticipantsValidation = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const ValErrors = { ...validationErrors };
    console.log(ValErrors);
    if (value === "" || value === false) {
      ValErrors[name] = "This filed is required !";
      setValidationErrors(ValErrors);
    } else if (value < 10 || value === 10) {
      ValErrors[name] =
        "Max Particiapants must be atleast equal or higher than 10!";
      setValidationErrors(ValErrors);
    } else {
      delete ValErrors[name];
      setValidationErrors(ValErrors);
    }
  };

  const Platform = () => {
    return (
      <div className=" rounded col-md-12 col-lg-6 col-sm-12 my-4">
        <h5 className="text-white mb-4">Platform</h5>

        <div className="col-md-12 col-lg-6 col-sm-12 my-4">
          <select
            name={"platform"}
            onChange={(e) => {
              platformInputChangeHandler(e);
            }}
            className="form-select bg-dark text-white mt-3 "
            value={formData["platform"] || "choose"}
          >
            <option disabled value="choose">
              Choose
            </option>
            \
            {platformOptions.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container  my-5 row ">
        {SelectedInputs.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className=" rounded col-md-12 col-lg-6 col-sm-12 my-4">
                <h5 className="text-white mb-4">{item.label}</h5>

                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name={item.name}
                    id={item.id1}
                    autoComplete="off"
                    checked={formData[item.name] === item.option1}
                    onChange={(e) => checkBoxesChangeHandler(e, item.option1)}
                  />
                  <label
                    className="btn btn-outline-secondary md"
                    htmlFor={item.id1}
                  >
                    {item.option1}
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name={item.name}
                    id={item.id2}
                    autoComplete="off"
                    checked={formData[item.name] === item.option2}
                    onChange={(e) => checkBoxesChangeHandler(e, item.option2)}
                  />
                  <label
                    className="btn btn-outline-secondary md"
                    htmlFor={item.id2}
                  >
                    {item.option2}
                  </label>
                  {index === 2 && (
                    <>
                      <input
                        type="radio"
                        className="btn-check"
                        name={item.name}
                        id={item.id3}
                        autoComplete="off"
                        checked={formData[item.name] === item.option3}
                        onChange={(e) =>
                          checkBoxesChangeHandler(e, item.option3)
                        }
                      />
                      <label
                        className="btn btn-outline-secondary md"
                        htmlFor={item.id3}
                      >
                        {item.option3}
                      </label>
                    </>
                  )}
                </div>
                <p className="text-danger mt-2">
                  {validationErrors[item.name]}
                </p>
              </div>
              {index === 1 ? <Platform /> : <></>}
            </React.Fragment>
          );
        })}

        <div className="form-group col-md-6 col-sm-12 ">
          <label htmlFor="max-participants" className="form-label ">
            Maximum Participants
          </label>
             {/*if the request is an updating form , then there is no abiltiy to update the max_participants */}
          <input
          
          disabled={request!=="UPDATE_TOURNAMENT"}
            name="max_participants"
            value={parseInt(formData.max_participants)}
            onChange={(e) => {
              handleMaxParticipantsChange(e);
              handleMaxParticipantsValidation(e);
              console.log(validationErrors);
            }}
            // onBlur={e=>handleMaxParticipantsValidation (e)}
            onFocus={(e) => handleMaxParticipantsValidation(e)}
            // onBlur={(e) => handleMaxParticipantsValidation(e)}
            ref={inputRef}
            type="number"
            className="form-control bg-dark text-white"
            id="max-participants"
            placeholder=""
          />
          <p className="my-2 text-danger">
            {validationErrors.max_participants}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SettingsForm;
