import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import "../../style.css";
//consider the probs
export const BasicsForm = ({
  formData,
  setFormData,
  setValidationErrors,
  validationErrors,
  image,
  setImage
}) => {
  //init values used for validation logic
  //since the validation object is empty ,which means at the refresh the next button will be enabled since the object is empty ,
  //so we gonna use  useEffect() hook to init. the object with init. values i've mentioned, in order to prevent the enabled next button state

  //basic form data handling function
  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };

    setFormData(updatedFormData);
  };
  //validaton handler of the form data , consdier each step, note how the object filled with attributes ,and deleted in case there is no validation errros
  //remember next button state is related to the object attributes number
  const validationHandler = (e) => {
    const inputValue = e.target.value;
    const updatedValidationErrors = { ...validationErrors };
    if (!inputValue.trim() || inputValue === "") {
      updatedValidationErrors.title = "Title field is required!";
      setValidationErrors(updatedValidationErrors);
    } else if (inputValue.length < 5 || inputValue.length > 100) {
      updatedValidationErrors.title =
        "Title must be between 4 characters minimum and 100 characters maximum";
      setValidationErrors(updatedValidationErrors);
    } else {
      delete updatedValidationErrors.title;
      setValidationErrors(updatedValidationErrors);
    }
    console.log(updatedValidationErrors);
  };
  //this function is exclusive for time input validation handling
  const time_valdation_handler = (e) => {
    const inputValue = e.target.value;

    const updatedValidationErrors = { ...validationErrors };
    if (!inputValue.trim() || inputValue === "") {
      updatedValidationErrors.start_time = `time field is required!`;
      setValidationErrors(updatedValidationErrors);
    } else {
      delete updatedValidationErrors.start_time;
      setValidationErrors(updatedValidationErrors);
    }
  };
  //this function is exclusive for date input validation handling
  const date_valdation_handler = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    const selectedDate = new Date(inputValue);
    const currentDate = new Date();
    const updatedValidationErrors = { ...validationErrors };
    //make sure the date input isn't empty
    if (!inputValue.trim() || inputValue === "") {
      updatedValidationErrors[inputName] = `date field is required!`;
      setValidationErrors(updatedValidationErrors);
      //make sure the date input isn't in the past
    } else if (selectedDate < currentDate) {
      updatedValidationErrors.start_date = "Start date cannot be in the past!";
      setValidationErrors(updatedValidationErrors);
    } else {
      delete updatedValidationErrors.start_date;
      setValidationErrors(updatedValidationErrors);
    }
  };
  //input refrence, focus in the first input (used for more stable next button state)
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  
    
  }, []);
  //image file handler , try it (expermental use only)
  const [file, setFile] = useState(null);
  const imageHandleChange = (e) => {
    setFile(e.target.files[0]);
    setFormData({ ...formData, cover_image_url: e.target.files[0] });

    console.log("image =>>>", file);
  };

  //==============CANCELLED (BASE64 METHOD) ====================
  //cancelled due to poor performance and high payload
  // const convertToBase64 = (e) => {
  //   const updatedFormData = { ...formData };
  //   console.log(e);
  //   var reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     console.log(reader.result);

  //     updatedFormData.cover_image_url = reader.result;
  //     setFormData(updatedFormData);
  //     setImage(reader.result);
  //   };
  //   reader.onerror = (error) => {
  //     console.log("Error:", error);
  //   };
  // };

  const TimetableInputs = [
    {
      name: "start_date",
      label: "Start Date",
      type: "date",
      value: formData.start_date,
      validationError: validationErrors.start_date,
      validation: date_valdation_handler,
    },
    {
      name: "start_time",
      label: "Start Time",
      type: "time",
      value: formData.start_time,
      validationError: validationErrors.start_time,
      validation: time_valdation_handler,
    },
  ];

  const imageHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <React.Fragment>
      {/*whole container start*/}
      <div className="container   m-0">
        {/* Selected game section start */}
        <div className="mt-5 mb-4 col-12 ">
          <h5 className="text-muted mb-3">Selected Game</h5>
          <h4 className="text-white">{formData.game}</h4>
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
              //   onBlur={(e) => validationHandler(e)}

              onBlur={(e) => {
                validationHandler(e);
              }}
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
          {TimetableInputs.map((item, index) => {
            return (
              <div key={index} className="col-md-6 col-sm-12 form-group my-3">
                <label htmlFor={item.name} className="form-label">
                  {item.label}
                </label>
                <input
                  name={item.name}
                  onChange={(e) => {
                    handleChange(e);
                    item.validation(e);
                    console.log(typeof e.target.value);
                  }}
                  onBlur={(e) => item.validation(e)}
                  type={item.type}
                  className="form-control bg-dark text-white"
                  value={item.value}
                ></input>
                <p className="my-2 text-danger">{item.validationError}</p>
              </div>
            );
          })}
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
              name="cover_image_url"
              accept="image/*"
              onChange={(e)=>{
                
                imageHandler(e)
               imageHandleChange(e)
              }}
              className="form-control bg-dark bg-primary text-white"
              id="image"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              style={{display:"none"}}
            />
         
           <label htmlFor="image"  style={{cursor:"pointer",}}  id="image_label">
      
            <img id="preview_image" className="img-fluid rounded" style={{height:"450px",width:"1300px"}} src={image} alt="selected-banner" />
      
          </label>
      
          </div>
          <div className="d-flex justify-content-center pt-5">
       
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default BasicsForm;
