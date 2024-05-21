import React from "react";
import { Link } from "react-router-dom";
const SideBar = ({elementsList,sideBarTitle}) => {
  return (
    <React.Fragment>
      <div
        className="offcanvas offcanvas-start bg-dark"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header mt-2">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
           {sideBarTitle}
          </h5>

          <button
            type="button"
            className="btn-close bg-secondary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <hr />
          <div className="w-50 h-25">
            {elementsList.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  className="btn btn-md  text-white btn-outline-danger mb-4 custom-btn mt-5 d-block "
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}
            
          </div>
        </div>
      </div>

      <nav className="navbar navbar-dark my-3">
        <button
          className="btn border"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
    </React.Fragment>
  );
};
export default SideBar;