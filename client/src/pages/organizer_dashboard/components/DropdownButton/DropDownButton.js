import React from "react";
import { Link } from "react-router-dom";
const DropdownButton = ({ handler, _id, label, buttonColor }) => {
  return (
    <React.Fragment>
      <button
        type="button"
        className={`btn  btn-sm rounded-0 ${buttonColor} `}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {label}
      </button>
      <ul className="dropdown-menu bg-dark border border-danger ">
        <div className="d-flex justify-content-around  p-2 bg-dark">
          <Link
            className="dropwdown-item btn btn-sm btn-danger"
            onClick={() => {
              handler(_id);
            }}
          >
            Confirm
          </Link>
          <li>
            <button
              className=" btn btn-sm btn-secondary"
              // href=""
            >
              Cancel
            </button>
          </li>
        </div>
      </ul>
    </React.Fragment>
  );
};
export default DropdownButton;
