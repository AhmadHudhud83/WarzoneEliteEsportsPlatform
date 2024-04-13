import logo from '../images/logo.png';
import "./header.css";
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='container2'>
      <Navbar bg="body-tertiary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img className="logo" src={logo} alt="Logo"/>
            

          </Navbar.Brand>
          <div id="demoFont">Warzone Elite</div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
          <Navbar.Collapse in={isOpen}>
            <Nav className="me-auto mb-2 mb-lg-0" id="navitem">
              <Nav.Link href="#">HOME</Nav.Link>
              <Nav.Link href="#">BLOG</Nav.Link>
              <Nav.Link href="#">HELP CENTER</Nav.Link>
              <Nav.Link href="#">ABOUT US</Nav.Link>
              <Nav.Link href="#">CONTACT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <form className="cc" role="search">
            <button className="navbtn">GET STARTED</button>
          </form>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
