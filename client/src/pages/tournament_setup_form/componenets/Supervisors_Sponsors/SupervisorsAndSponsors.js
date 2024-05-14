import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import { createContext } from "react";
export const useSupervisorsAndSponsorsDetails = createContext();
export const SupervisorsAndSponsors = ({ setValidationErrors,setFormData,formData,validationErrors }) => {
  
  const SponsorsfiledNames = ["Brand", "Email"]; //array of sponsors table header labels
  // const sponsorsArrInit = [
  //   //array of dummy data  (sponsors objects)
   
  // ];
  // const [sponsorsArray, setSponsorsArray] = useState(sponsorsArrInit); //state for the sponosrs array
  // const handleSponsorsArrayChange = (newArray) => {
  //   //handler to send with props
  //   setSponsorsArray(newArray);
  // };
 
//=========================END OF DEFINING TABLE CONTETNS======================================
  return (
    <useSupervisorsAndSponsorsDetails .Provider value={{formData,setFormData,SponsorsfiledNames,setValidationErrors,validationErrors}} >
    <React.Fragment>
      <div className="container">
        <Table
 
        />
         
      </div>
    </React.Fragment>
    </useSupervisorsAndSponsorsDetails .Provider>
  );
};
export default SupervisorsAndSponsors;
