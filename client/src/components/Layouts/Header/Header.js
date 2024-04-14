import logo from '../images/logo.png';
import "./header.css";
import React, { useRef,useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
   const navbarLinks = [
    {title:"HOME", link : "#"},
    {title:"BLOG", link : "#"},
    {title:"HELP CENTER", link : "#"},
    {title:"ABOUT US", link : "#"},
    {title:"CONTACT", link : "#"}
   ]
  return (
    <div className='container2'>
      <Navbar bg="body-tertiary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img className="logo" src={logo} alt="Logo"/>
            

          </Navbar.Brand>
          <div id="demoFont">Warzone Elite</div>
          <Navbar.Toggle style={{ color: 'white' }} aria-controls="basic-navbar-nav"  onClick={toggleMenu} />
          <Navbar.Collapse in={isOpen} className="custom-toggle">
            <Nav className="me-auto mb-2 mb-lg-0" id="navitem" >
          
              {navbarLinks.map((item,index)=>{

                return(<Nav.Link key={index} href={item.link} >{item.title} </Nav.Link>)
              })}
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