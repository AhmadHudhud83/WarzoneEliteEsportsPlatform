import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './SideBar.css'
import LogoutButton from '../../pages/Logout/logout';
import Cookies from 'js-cookie';

const SideBar = ({ elementsList, sideBarTitle }) => {


  const [playerId, setPlayerId] = React.useState(Cookies.get('user_id'));

  useEffect(() => {
    setPlayerId(Cookies.get('user_id'));
  }, []);
  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: "url(https://i.imgur.com/5OFllrX.jpeg)" }}
        className="offcanvas offcanvas-start side-bar "
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header mt-2" >
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
        <div className="offcanvas-body ">
          <hr />
          <div className="w-50 h-25">
            {elementsList.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  className="btn btn-md btn-primary text-white px-0 py-2  mb-4 custom-btn mt-5 d-block "
                  style={{ background: "linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)" }}
                  onClick={item.label === "Logout" ? item.request : ""}
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}
            {sideBarTitle !== "Organizer Dashboard" ?

              <div id="logout-btn">
                {playerId ? <LogoutButton pageName="login" /> :
                  <Link
                    to="/login"
                    className="btn btn-md btn-primary text-white px-0 py-2  mb-4 custom-btn mt-5 d-block "
                    style={{ background: "linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)" }}
                  >
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                }
              </div>
              : <></>

            }

          </div>
        </div>
      </div>

      <nav className="navbar navbar-dark mt-3">
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