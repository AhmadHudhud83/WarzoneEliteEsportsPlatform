import React, { useEffect, useState } from "react";

import "./footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    const lang = i18n.language === "en" ? "English" : "العربية";
    setSelectedLanguage(lang);
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language.name);
    i18n.changeLanguage(language.t);
  };

  const footerList = [
    { link: "#", element: t("Blog") },
    { link: "#", element: t("Feedback Center") },
    { link: "#", element: t("Joined Tournaments") },
    { link: "#", element: t("Contact Us") },
  ];
  const socialMediaList = [
    "fa-square-facebook",
    "fa-square-twitter",
    "fa-square-instagram",
    "fa-square-youtube",
  ];

  const languages = [
    { t: "en", name: "English" },
    { t: "ar", name: "العربية" },
  ];

  const buttonStyle = {
    background:
      "linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)",
  };

  return (

      <div className="main-footer px-5 ">
        <Link to="/">
          <img
            className="logo"
            style={{ width: "150px", height: "auto" }}
            src="https://i.imgur.com/rCPCVg6.png"
            alt="logo"
          />
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-3 ">
              <p className="list-unstyled">
                {t(
                  "Our success in creating business solutions is due in large part to our talented and highly committed team ."
                )}
              </p>
            </div>
            {/*column 2*/}
            <div className="col ">
              <h4>{t("Usefull Links")}</h4>
              <ul className="list-unstyled">
                {footerList.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="footer-hover" to={item.link}>
                        {item.element}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/*column 2*/}
            <div className="col ">
              <h4>{t("Contact Us")}</h4>
              <div className="list-unstyled">
                <ul>
                  <li>
                    <h6>{t("LOCATION:")}</h6>
                    <address>
                      153 Williamson Plaza, Maggieberg, MT 09514
                    </address>
                  </li>
                  <li>
                    <h6>{t("PHONE:")}</h6>
                    <Link className="footer-hover" to="">
                      +1 (062) 109-9222
                    </Link>
                  </li>
                  <li>
                    <h6>{t("EMAIL:")}</h6>
                    <Link className="footer-hover" to="">
                      Info@YourGmail24.com
                    </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>{" "}
            {/*column 3*/}
            <div className="col">
              <h4>{t("SOCIAL MEDIA")}</h4>
              <ul className="list-unstyled">
                <div className="socials">
                  <a href="#">
                    {socialMediaList.map((item, index) => {
                      return (
                        <i key={index} className={`fa-brands ${item}`}></i>
                      );
                    })}
                  </a>
                </div>
              </ul>
              <div className="sign-upfooter">
                <p className="para-sign">
                  {t("Get exclusive assets sent straight to your inbox")}
                </p>
                <ul className="signup-footer">
                  <li>
                    <Link
                      style={buttonStyle}
                      className="btn btn-primary footer-hover1"
                      to=""
                    >
                      {t("Sign up")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/*Footer-button*/}

        <div className="footer-button">
          <p className="text-xs-center">
            {t("Copyright ©  2024 Warzone Elite  All rights reserved.")}
          </p>
        </div>

        <div className="dropdown dropdown-loc">
          <Link
            style={buttonStyle}
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedLanguage}
          </Link>

          <ul className="dropdown-menu">
            {languages.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => handleLanguageChange(item)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    
  );
};

export default Footer;
