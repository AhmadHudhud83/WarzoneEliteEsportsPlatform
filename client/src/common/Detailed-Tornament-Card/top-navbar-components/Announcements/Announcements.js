import React, { useContext, useState } from "react";
import "./Announcements.css";
import { useTournamentDetails } from "../..";
export const Announcements = () => {
  const [AnnouncementsArr, setAnnouncementsArr] = useState([
    { name: "Ahmad", no: "1", title: "lorem ipsum" },
    { name: "Osama", no: "2", title: "lorem ipsum" },
    { name: "Rama", no: "3", title: "lorem ipsum" },
    { name: "Areen", no: "4", title: "lorem ipsum" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // const handleAddInput = () => {
  //   if (inputValue.trim() !== "") {
  //     const newAnnouncement = {
  //       name: "Organizer",
  //       no: AnnouncementsArr.length+ 1,
  //       title: inputValue,
  //     };
  //     setAnnouncementsArr([...AnnouncementsArr, newAnnouncement])
  //     setInputValue("");
  //   }
  // }
  const tournamentDetails = useContext(useTournamentDetails)

  return (
    <React.Fragment>
      {/* <h1>{tournamentDetails}</h1> */}
      {/* <h4 className=" my-3 me-auto text-center ">Announcements</h4> */}
      <div className="d-flex mx-5 ">
        {" "}
        
        {/* <div  className="input-group my-3 w-50 ">
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            className="form-control bg-dark text-white border-danger "
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            onClick={e=>console.log(e.target.value)}
            className="btn btn-secondary"
            type="button"
            id="button-addon2"
          >
            Send
          </button>
        </div> */}
      </div>
      <ol className="list-group list-group-numbered bg-dark">
        {tournamentDetails.announcements.map((item,index)=>{
        return(<li key={index} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-start mt-4 fs-4 ">
        <div className="ms-2  me-auto">
          <div className="fw-bold mt ">Organizer </div>
         <p className="text-white mt-3">{item}</p> 
        
        </div>
        {/* <span className="badge  rounded-pill">{index}</span> */}
       
      </li>)   
        })}
      
      </ol>
    </React.Fragment>
  );
};
