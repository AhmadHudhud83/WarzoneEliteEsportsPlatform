import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const StatusCheckBoxGroup = ({
  groupName,
  id1,
  id2,
  id3,
  _status,
  fieldName,
  thisTournament,
}) => {
  //if the flag is tournament status , then set values accroding it , 
  // else if they were for registeration , then assign it's default values
  const setLabels = () => {
    if (fieldName === "tournament_status") {
      return ["Uninitialized", "Finished", "Ongoing"];
    } else {
      return ["Opened", "Closed"];
    }
  };
  const labels = setLabels();
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
          defaultChecked={_status === labels[0]}
          onChange={(e) => {
            statusHandler(labels[0]);
          }}
          // onMouseOver={() => console.log("HEREBOY", statusData)}
        />
        <label
          className="btn btn-sm btn-outline-secondary"
          htmlFor={`btnradio${id1}`}
        >
          {labels[0]}
        </label>
        <input
          type="radio"
          className="btn-check"
          name={groupName}
          id={`btnradio${id2}`}
          autoComplete="off"
          defaultChecked={_status === labels[1]}
          onChange={(e) => {
            statusHandler(labels[1]);
          }}
          // onMouseOver={() => console.log("HEREBOY", statusData)}
        />
        <label
          className="btn btn-sm btn-outline-secondary"
          htmlFor={`btnradio${id2}`}
        >
          {labels[1]}
        </label>
        {fieldName === "tournament_status" && id3 && (
          <>
            <input
              type="radio"
              className="btn-check"
              name={groupName}
              id={`btnradio${id3}`}
              autoComplete="off"
              defaultChecked={_status === labels[2]}
              onChange={(e) => {
                statusHandler(labels[2]);
              }}
              // onMouseOver={() => console.log("HEREBOY", statusData)}
            />
            <label
              className="btn btn-sm btn-outline-secondary"
              htmlFor={`btnradio${id3}`}
            >
              {labels[2]}
            </label>
          </>
        )}
      </div>
    </React.Fragment>
  );
};
export default StatusCheckBoxGroup;
