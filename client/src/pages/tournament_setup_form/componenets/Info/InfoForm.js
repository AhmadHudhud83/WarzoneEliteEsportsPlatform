import React, { useEffect, useRef, useState } from "react";

export const InfoForm = ({
  formData,
  setFormData,
  setValidationErrors,
  validationErrors,
}) => {
 
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const FormInputs = [
    { label: "Contact Details", name: "contact_details" },
    { label: "Rules", name: "rules" },
    { label: "Prize", name: "prize" },
    { label: "Description", name: "description" },
    { label: "Schedule", name: "schedule" },
  ];

  const isValidUrl = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "(?:www\\.)?" +
        "[a-zA-Z0-9.-]+" +
        "\\.[a-zA-Z]{2,}" +
        "(\\/[\\w-]+)*" +
        "(\\?[\\s\\S]*)?" +
        "(\\#[\\s\\S]*)?$",
      "i"
    );
    return pattern.test(str);
  };

  const handleChange = (e) => {

    const updatedFormData = { ...formData, [e.target.name]: e.target.value };

    setFormData(updatedFormData);
    console.log(updatedFormData);
  };

  const validationHandler = (e) => {
    const inputValue = e.target.value;
    const valErrors = {...validationErrors};
    if (!inputValue.trim() || inputValue === "") {
      valErrors.contact_details = "Contact us field is required!"
      setValidationErrors(valErrors);
    } else if (!isValidUrl(inputValue)) {
      valErrors.contact_details = "You must provide a valid contact link";
      setValidationErrors(valErrors);
    }
    else{
      delete valErrors.contact_details
      setValidationErrors(valErrors);
    }
  
    console.log(validationErrors);
  }
 

  return (
    <React.Fragment>
      <div className="container   m-0">
        <div className="form-container ">
          {FormInputs.map((item, index) => {
            return (
              <div key={index} className="mb-3  my-4">
                <label className="my-4 ">{item.label}</label>
                <textarea
                name={item.name}
                  className="form-control bg-dark  text-white"
                  onChange={(e) => {
                    handleChange(e);
                    if (index === 0) {
                      validationHandler(e);
                    }
                  }}
                  value={
                    formData[item.name]
                    // index === 0 ? formData["contact_details"] :
                  }
                  onFocus={(e) => {
                    index === 0 && validationHandler(e);
                  }}
                  onBlur={(e)=>{
                    index===0&&validationHandler(e)
                  }}
                  ref={index===0?inputRef:undefined}
                />
                {index === 0 ? (
                  <span className="mb-3 d-block text-danger">
                    {validationErrors.contact_details}
                  </span>
                ) : (
                  <span className="m-3 d-block text-success">OPTIONAL </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
