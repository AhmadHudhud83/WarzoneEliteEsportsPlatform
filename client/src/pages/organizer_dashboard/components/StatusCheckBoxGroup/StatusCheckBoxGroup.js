import React, { useState } from "react";
import {  useEffect } from "react";
import axios from "axios";
const StatusCheckBoxGroup = ({
  groupName,
  id1,
  id2,
  _status,
  fieldName,
  thisTournament,
}) => {


  const [statusData, setStatusData] = useState({
    fieldName: thisTournament[fieldName],
  });

  useEffect(() => {
    setStatusData({
      [fieldName]: thisTournament[fieldName],
    });
  }, [thisTournament, fieldName]);
  const statusHandler = async (newStatus) => {
    //status to determine weather its tournament status or registration status

    setStatusData(newStatus);
    // console.log("status DATA IS : ", statusData);
    // console.log("fieldNAME IS  : ", fieldName);
    // console.log("tournament id : ", thisTournament);
    try {
      const updatedStatusData = { [fieldName]: newStatus };
      const res = await axios.put(
        `http://localhost:5000/api/tournaments/${thisTournament._id}`,
        updatedStatusData
      );
      setStatusData(thisTournament[fieldName]);
      console.log("res data : ", res.data);
    } catch (error) {
      console.error(`Error editing ${fieldName}`, error);
    }
  };

  return (
    <React.Fragment>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name={groupName}
          id={`btnradio${id1}`}
          autoComplete="off"
          defaultChecked={_status === "Opened"}
          onChange={(e) => {
            statusHandler("Opened");
          }}
          // onMouseOver={() => console.log("HEREBOY", statusData)}
        />
        <label
          className="btn btn-sm btn-outline-secondary"
          htmlFor={`btnradio${id1}`}
        >
          Opened
        </label>
        <input
          type="radio"
          className="btn-check"
          name={groupName}
          id={`btnradio${id2}`}
          autoComplete="off"
          defaultChecked={_status === "Closed"}
          onChange={(e) => {
            statusHandler("Closed");
          }}
          // onMouseOver={() => console.log("HEREBOY", statusData)}
        />
        <label
          className="btn btn-sm btn-outline-secondary"
          htmlFor={`btnradio${id2}`}
        >
          Closed
        </label>
      </div>
    </React.Fragment>
  );
};
export default StatusCheckBoxGroup;
