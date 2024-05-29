// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import "./registrationCard.css"
// import { useTournamentDetails } from "..";
// import { useTranslation } from 'react-i18next'

// const RegistrationCard = () => {
//   const { t } = useTranslation();
//   const tournament = useContext(useTournamentDetails);
//   const [showReportBox, setShowReportBox] = useState(false);

//   const handleReportClick = () => {
//     setShowReportBox(true);
//   };

//   const handleCloseReportBox = () => {
//     setShowReportBox(false);
//   };
//   const handleOpenReportBox = () => {
//     setShowReportBox(false);
//   };
//   return (
//     <React.Fragment>
//       <div
//         className="card bg-dark mt-5 ms-5 g "
//         style={{ width: "40rem", height: "25rem" }}
//       >
//         <div className="card-body">
//           <h2 className="card-title my-5  ">
//             Registration {tournament.registeration_status}
//           </h2>
//           <p className="card-text">
//             {t("Some quick example text to build on the card title and make up the bulk of the card's content.")}
//           </p>

//           <h4>
//             {tournament.participants.length}/{tournament.max_participants}{" "}
//             Participants
//           </h4>

//           <div className="btn-group">
//             <button type="button" className="btn btn-danger">
//               {t("Report")}
//             </button>
//             <button
//               type="button"
//               className="btn btn-danger dropdown-toggle dropdown-toggle-split"
//               data-bs-toggle="dropdown"
//               aria-expanded={showReportBox}
//             >
//               <span className="visually-hidden">Toggle Dropdown</span>
//             </button>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" >{t("Action")}</a></li>
//               <li><a className="dropdown-item" >{t("Another action")}</a></li>
//               <li><a className="dropdown-item" >{t("Something else here")}</a></li>
//               <li>
//                 <a className="dropdown-item" onClick={handleReportClick}>
//                   {t("Other")} ...
//                 </a>
//               </li>
//             </ul>
//           </div>
//           {showReportBox && (
//             <div className="report-box">
//               <textarea className="write-box" placeholder="Write your report here..." />
//               <button className="close-btn" onClick={handleCloseReportBox}>{t("Close")}</button>
//               <button className="submit-btn" onClick={handleOpenReportBox}>{t("Submit")}</button>

//             </div>
//           )}

//         </div>

//         <button
//           className="btn btn-danger "
//           disabled={tournament.registeration_status === "Closed"}
//         >
//           {t("Join Tournament")}
//         </button>

//       </div>
//     </React.Fragment>
//   );
// };
// export default RegistrationCard;
