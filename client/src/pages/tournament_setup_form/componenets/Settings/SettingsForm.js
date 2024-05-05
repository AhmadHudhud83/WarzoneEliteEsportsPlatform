import React, { useEffect, useState, useRef } from "react";
import "../../style.css";
export const SettingsForm = ({
  formData,
  setFormData,
  setValidationErrors,
  validationErrors,
}) => {
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
      option1: "Opened",
      option2: "Closed",
      id1: 48,
      id2: 49,
    },
  ];
  const platformOptions = ["PC", "Console", "Mobile", "Combained"];
  const handleMaxParticipantsValidation = (e) => {
    const updatedValErrors = { ...validationErrors };
    const inputValue = e.target.value;
    if (inputValue === 0 || inputValue < 0) {
      updatedValErrors.max_participants =
        "Max participants cannot be equal or less to zero !";
      setValidationErrors(updatedValErrors);
    } else {
      delete updatedValErrors.max_participants;
      setValidationErrors(updatedValErrors);
    }
    console.log(updatedValErrors);
  };
  const handleMaxParticipantsChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && parseInt(value) >= 0) {
      const updatedFormData = { ...formData, [e.target.name]: value };
      setFormData(updatedFormData);
      console.log(updatedFormData);
    }
  };
  const platformInputChangeHandler = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData); //for the default selected input
    console.log(updatedFormData);

    //  console.log(updatedFormData);
  };

  const checkBoxesChangeHandler = (e, optionValue) => {
    const name = e.target.name;
    const updatedFormData = { ...formData, [name]: optionValue };
    setFormData(updatedFormData);
  };

  return (
    <React.Fragment>
      <div className="container  my-5 row ">
        {SelectedInputs.map((item, index) => {
          return (
            <div
              key={index}
              className=" rounded col-md-12 col-lg-6 col-sm-12 my-4"
            >
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
              </div>
            </div>
          );
        })}

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
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>

          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          ></div>
        </div>

        <div
          className="btn-group w-50  "
          role="group"
          aria-label="Basic radio toggle button group"
        ></div>
        <div className="d-flex justify-content-center mt-5">
          <div className="form-group col-md-6 col-sm-12 ">
            <label htmlFor="max-participants" className="form-label ">
              Maximum Participants
            </label>
            <input
              name="max_participants"
              value={Number(formData.max_participants)}
              onChange={(e) => {
                handleMaxParticipantsChange(e);
                handleMaxParticipantsValidation(e);
                console.log(validationErrors);
              }}
              onBlur={(e) => handleMaxParticipantsChange(e)}
              ref={inputRef}
              type="number"
              className="form-control bg-dark text-white"
              id="max-participants"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
