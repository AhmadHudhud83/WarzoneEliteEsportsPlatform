import React, { useState, useEffect } from 'react';
import './footer.css'
import { Link } from "react-router-dom";

const Footer = () => {

    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const footerList = [
        {link:"#",element:"Tournaments"},
        {link:"#",element:"Help Center"},
        {link:"#",element:"Privacy and Policy"},
        {link:"#",element:"Terms of Use"},
        {link:"#",element:"Contact Us"},

    ]
    const socialMediaList = [
"fa-square-facebook",
"fa-square-twitter",
"fa-square-instagram",
"fa-square-youtube",

    ]

    const languages = [
         "English","العربية"
        
    ]


    return (


        <footer >
            <div className="main-footer">
                <Link to="/">

                    <img
                       className='logo'
                       style={{width:"150px",height:"auto"}}
                        src="https://i.imgur.com/rCPCVg6.png"
                   
                        alt="logo"
                    />
                </Link>
                <div className="container">

                    <div className="row">
                        <div className="col-md-3 ">
                            <p className="list-unstyled">
                                Our success in creating business
                                solutions is due in large part to our
                                talented and highly committed team .</p>

                        </div>
                        {/*column 2*/}
                        <div className="col ">
                            <h4>Usefull Links</h4>
                            <ul className="list-unstyled">
                                
                                {
                                    footerList.map((item,index)=>{

                                       return(<li key={index}><Link className='footer-hover' to={item.link}>{item.element}</Link></li>) 
                                    })
                                }
                            </ul>
                        </div>
                        {/*column 2*/}
                        <div className="col ">
                            <h4>Contact Us</h4>
                            <div className="list-unstyled">

                                <ul>
                                    <li>
                                        <h6>LOCATION:</h6>
                                        <address>153 Williamson Plaza, Maggieberg, MT 09514</address>
                                    </li>
                                    <li>
                                        <h6>PHONE:</h6>
                                        <Link className="footer-hover" to="">+1 (062) 109-9222</Link> 
                                    </li>
                                    <li>
                                        <h6>EMAIL:</h6>
                                        <Link className="footer-hover" to="">Info@YourGmail24.com</Link>                                            </li>
                                    
                                </ul>
                            </div>


                        </div>	{/*column 3*/}
                        <div className="col">
                            <h4> SOCIAL MEDIA</h4>
                            <ul className="list-unstyled">
                                <div className="socials">
                                    <a href="#">
                                   

                                        {
                                            socialMediaList.map((item,index)=>{
                                                return(<i key={index} className={`fa-brands ${item}`}></i> )
                                            })
                                        }
                                    </a>
                                </div>
                            </ul>
                            <div className="sign-upfooter">
                                <p className="para-sign">Get exclusive assets sent straight to your inbox</p>
                                <ul className="signup-footer">
                                    <li><Link className="btn btn-primary footer-hover1" to="">Sign up</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                {/*Footer-button*/}

                <div className="footer-button">
                    <p className="text-xs-center">
                        Copyright ©  2024 Warzone Elite  All rights reserved.
                    </p>
                </div>

                <div className="dropdown dropdown-loc">
                    <Link className="btn btn-secondary dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedLanguage}
                    </Link>

                    <ul className="dropdown-menu">
                        {/* <li><Link className="dropdown-item" to="#" onClick={() => handleLanguageChange('English')}>English</Link></li>
                        <li><Link className="dropdown-item" to="#" onClick={() => handleLanguageChange('العربية')}>العربية</Link></li> */}
                        {languages.map((item,index)=>{
                            return(<li key={index}><Link className='dropdown-item' to="#" onClick={() => handleLanguageChange(item)}>{item}</Link></li>)
                        })}


                    </ul>
                </div>

            </div >
        </footer >
    )
}



export default Footer;
