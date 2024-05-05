import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../style.css";
//consider the probs
export const BasicsForm = ({
  formData,
  setFormData,
  setValidationErrors,
  validationErrors,
}) => {
  const { game } = useParams() //for showing the game selceted from url
  const intialValidationValues = { title: "", start_date: "", start_time: "" } //init values used for validation logic
  //since the validation object is empty ,which means at the refresh the next button will be enabled since the object is empty , 
  //so we gonna use  useEffect() hook to init. the object with init. values i've mentioned, in order to prevent the enabled next button state
  useEffect(() => {
    setValidationErrors(intialValidationValues)
  }, []);
//basic form data handling function 
  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };

    setFormData(updatedFormData);
  }
  //validaton handler of the form data , consdier each step, note how the object filled with attributes ,and deleted in case there is no validation errros 
  //remember next button state is related to the object attributes number
  const validationHandler = (e) => {
    const inputValue = e.target.value;
    const updatedValidationErrors = { ...validationErrors }
    if (!inputValue.trim() || inputValue === "") {
      updatedValidationErrors.title = "Title field is required!"
      setValidationErrors(updatedValidationErrors);
    } else if (inputValue.length < 5 || inputValue.length > 100) {
      updatedValidationErrors.title =
        "Title must be between 4 characters minimum and 100 characters maximum"
      setValidationErrors(updatedValidationErrors)
  
    }
    else{
      delete updatedValidationErrors.title
      setValidationErrors(updatedValidationErrors)
    }
    console.log(updatedValidationErrors)
  }
//this function is exclusive for time input validation handling
  const time_valdation_handler = (e) => {
    const inputValue = e.target.value

    const updatedValidationErrors = { ...validationErrors }
    if (!inputValue.trim() || inputValue === "") {
      updatedValidationErrors.start_time = `time field is required!`
      setValidationErrors(updatedValidationErrors)
    } else {
      delete updatedValidationErrors.start_time
      setValidationErrors(updatedValidationErrors)
    }
  }
//this function is exclusive for date input validation handling
  const date_valdation_handler = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    const selectedDate = new Date(inputValue)
    const currentDate = new Date()
    const updatedValidationErrors = { ...validationErrors }
    //make sure the date input isn't empty
    if (!inputValue.trim() || inputValue === "") {
      updatedValidationErrors[inputName] = `date field is required!`
      setValidationErrors(updatedValidationErrors)
      //make sure the date input isn't in the past
    } else if (selectedDate < currentDate) {
      updatedValidationErrors.start_date = "Start date cannot be in the past!"
      setValidationErrors(updatedValidationErrors)
    } else {
      delete updatedValidationErrors.start_date
      setValidationErrors(updatedValidationErrors)
    }
  }
  //input refrence, focus in the first input (used for more stable next button state)
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  //image file handler , try it (expermental use only)
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const imageHandleChange = (e) => {
    console.log(e.target.files);
    if (e) {
      setFile(URL.createObjectURL(e.target.files[0]));
    } else {
      console.error("nothing selected");
    }
  };



  return (
    <React.Fragment>
      {/*whole container start*/}
      <div className="container   m-0">
        {/* Selected game section start */}
        <div className="mt-5 mb-4 col-12 ">
          <h5 className="text-muted mb-3">Selected Game</h5>
          <h4 className="text-white">{game}</h4>
          <hr />
        </div>
        {/* Selected game section end */}

        {/* tournament title section start */}
        <div className="py-3">
          <div className="form-group w-50 my-3">
            <label htmlFor="gameName" className="form-label ">
              <h4>Tournament title</h4>
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={(e) => {
                handleChange(e);
                validationHandler(e);
              }}
              onBlur={(e) => validationHandler(e)}
              onFocus={(e) => validationHandler(e)}
              type="text"
              className="form-control bg-dark text-white sigma"
              id="gameName"
              placeholder=""
              ref={inputRef}
            />
            <p className="my-2 text-danger">{validationErrors.title}</p>
          </div>
        </div>

        {/*tournament title section end */}

        {/*dates container start */}

        <div className="form-container row">
          <div className="col-md-6 col-sm-12 form-group my-3">
            <label htmlFor="start_date" className="form-label">
              Start Date
            </label>
            <input
              name="start_date"
              onChange={(e) => {
                handleChange(e);
                date_valdation_handler(e);
              }}
              onBlur={(e) => date_valdation_handler(e)}
              type="date"
              className="form-control bg-dark text-white"
              value={formData.start_date}
            ></input>
          </div>

          <div className="col-md-6 col-sm-12 form-group my-3">
            <label htmlFor="start_time" className="form-label">
              Start Time
            </label>
            <input
              name="start_time"
              onChange={(e) => {
                handleChange(e);
                time_valdation_handler(e);
              }}
              onBlur={(e) => time_valdation_handler(e)}
              type="time"
              className="form-control bg-dark text-white"
              value={formData.start_time}
            ></input>
          </div>
        </div>
        {/*dates container End */}
        <div className="w-75">
          <label className="my-2">About</label>
          <textarea
            name="about"
            className="form-control bg-dark  text-white"
            value={formData.about || ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-4">
          <p>Upload Game Banner</p>

          <div className="input-group">
            <input
              type="file"
              onMouseOver={(e) => {
                console.log(e.target);
              }}
              onChange={imageHandleChange}
              className="form-control bg-dark bg-primary text-white"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
            />
          </div>
          <div className="d-flex justify-content-center pt-5">
            <img src="{file}" classname="img-fluid rounded" alt="no image" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
