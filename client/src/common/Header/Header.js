import "./header.css";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navbarLinks = [
    { title: t('HOME'), link: '#' },
    { title: t('BLOG'), link: '#' },
    { title: t('HELP CENTER'), link: '#' },
    { title: t('ABOUT US'), link: '#' },
    { title: t('CONTACT'), link: '#' }
  ]
  return (

    <div className='container2'>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid d-flex ">
          <a className="navbar-brand" href="#">
            {/* <img className="logo" src={logo} alt="Logo" /> */}
          </a>
          <div id="demoFont">Warzone Elite</div>

          <button className="navbar-toggler navbar-dark " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMenu}>
            <span className="navbar-toggler-icon "  ></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-0 mb-2 mb-lg-0 ms-xs-0 ms-md-0 " id="navitem">
              {navbarLinks.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link" href={item.link} style={{ textDecoration: "none" }}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <form className="d-flex cc" role="search">
            <button className="navbtn btn btn-primary">{t("GET STARTED")}</button>
          </form>
        </div>
      </nav>

    </div>
  );
}

export default Header;