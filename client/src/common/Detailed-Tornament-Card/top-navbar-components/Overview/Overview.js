import React from "react"
import { useState } from "react"
import { Details } from '../../bottom-navbar-components/Details/Details';
import { Prizes } from "../../bottom-navbar-components/Prizes/Prizes";
import { Rules } from "../../bottom-navbar-components/Rules/Rules";
import { Schedule } from "../../bottom-navbar-components/Schedule/Schedule";
import { Contact } from "../../bottom-navbar-components/Contact/Contact";
export const Overview = ()=>{
    const bottomNavElements = [
        {link:"#",element:"DETAILS"},
        {link:"#",element:"RULES"},
        {link:"#",element:"PRIZES"},
        {link:"#",element:"SCHEDULE"},
        {link:"#",element:"CONTACT"}
        
    
    
    
    ]

    const [activeBottomComponent, setActiveBottomComponent] = useState(0  );

    const handleBottomComponent = (componentNumber) => {
      setActiveBottomComponent(componentNumber);
    };
    const [activeBottomNav,setActiveBottomNav]=useState(0)
    const handleActiveBottomNav=(i)=>{
        setActiveBottomNav(i)
    }


    return(<React.Fragment>

<div className="my-4 py-2 d-flex justify-content-center"><img style={{height:"30%",width:"70%"}} src="https://4kwallpapers.com/images/walls/thumbs_2t/11129.png" className="card-img-top" alt="..." />  </div>
<div className="card-header   ">
    
    <ul className="nav nav-pills card-header-pills my-3 d-flex justify-content-center ">
   


    {bottomNavElements.map((item,index)=>{
        return(
            <li  key ={index} className={`nav-item  ${activeBottomNav === index ? 'active' : ''}`}>
            <a  onClick={() => {
               
                handleBottomComponent(index);
                handleActiveBottomNav(index);
            }} className={`nav-link ${activeBottomNav === index ?'text-white':'text-muted'}`} href={item.link}>{item.element}</a>
          </li>     
        )
    })}
    
    </ul>
    <hr></hr>
    
    {activeBottomComponent===0 && <Details></Details>}
    {activeBottomComponent===1 &&<Rules></Rules>}
    {activeBottomComponent===2&&<Prizes></Prizes>}
    {activeBottomComponent===3&&<Schedule></Schedule>}
    {activeBottomComponent===4&&<Contact/>}
    
    
    
  </div>

    </React.Fragment>)
}