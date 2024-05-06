import React, { useState,useEffect } from "react";

export const SupervisorsAndSponsors = ({setValidationErrors}) => {
  const sponsorsArrInit = [
    { brand: "Nivida.lnc", email: "nivida123@email.com" },
    { brand: "AMD.lnc", email: "amd123@email.com" },
    { brand: "INTEL.lnc", email: "intel123@email.com" },
    { brand: "INTEL.lnc", email: "intel123@email.com" },
  ]

  const [sponsorsArray, setSponsorsArray] = useState(sponsorsArrInit);
  useEffect(()=>{
    setValidationErrors({})
  },[])
  return (
    <React.Fragment>
      <div className="container">
        <div className="d-flex my-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary "
              type="button"
              id="AddSponsors"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add Sponsors
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark rounded p-3"
              aria-labelledby="AddSponsors"
            >
              <li>
                <input
                  type="text"
                  placeholder=""
                  className="dropdown-item border-bottom border-light border-2"
                ></input>
              </li>
            </ul>
          </div>
          <div className="dropdown ms-4 ">
            <button
              className="btn btn-secondary "
              type="button"
              id="AddSupervisors"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add Supervisors
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark rounded p-3"
              aria-labelledby="AddSupervisors"
            >
              <li>
                <input
                  type="text"
                  placeholder=""
                  className="dropdown-item border-bottom border-light border-2"
                ></input>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className="pt-4">
          <h4 className="text-white mb-4">Sponsors</h4>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Brand </th>
                <th scope="col">Email</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {sponsorsArray.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{item.brand}</th>
                    <td>{item.email}</td>
                    <td>Edit , delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};
