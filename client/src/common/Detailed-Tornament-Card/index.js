import React,{useState} from "react"
import './style.css'
import { Overview } from "./top-navbar-components/Overview/Overview";
import { Participants } from "./top-navbar-components/Participants/Participants";
import { Pending } from "./top-navbar-components/Pending/Pending";
import { Announcements } from "./top-navbar-components/Announcements/Announcements";

import { ManagementButton } from "./managementButton/ManagementButton";
import Footer from "../Footer/Footer";



export const DetailedTournamentCard = ()=>{

    const [activeTopComponent, setActiveTopComponent] = useState(0);

  const handleTopComponent = (componentNumber) => {
    setActiveTopComponent(componentNumber);
  };






    const tournament_name ="demo_Tournament"
    const topNavElements = [
        {link:"#",element:"OVERVIEW"},
        {link:"#",element:"PARTICIPANTS"},
        {link:"#",element:"PENDING"},
        {link:"#",element:"ANNOUNCEMENTS"},
        

]



const [activeTopNav,setActiveTopNav]=useState(0)
const handleActiveTopNav=(i)=>{
    setActiveTopNav(i)
}




const x = `nav-link text-muted`
return(<React.Fragment>

<div  className="container org-cont " >
<h2 className="text-start  pb-3" >{tournament_name}</h2>
<div className="card  text-white bg-secondary cont-1  " >
  <div className="card-header border ">
    <div className="border-bottom">
    <ul className="nav nav-pills card-header-pills my-3 py-2 d-flex justify-content-center">
   
    {topNavElements.map((item,index)=>{
        return(
            <li  key ={index} className={`nav-item  ${activeTopNav === index ? 'active' : ''}`}>
            <a  onClick={() =>{
           handleTopComponent(index);
            handleActiveTopNav(index)}
            } className={`nav-link ${activeTopNav === index ? 'text-white' : 'text-muted'}`} href={item.link}>{item.element}</a>
          </li>
        )
    })}
    
    
    <ManagementButton/>
    </ul>
    
    </div>
    {activeTopComponent===0 && <Overview></Overview>}
    {activeTopComponent===1 && <Participants></Participants>}
    {activeTopComponent===2 && <Pending></Pending>}
    {activeTopComponent===3 && <Announcements></Announcements>}
    
    
    
  </div>
  
  

  
 
</div>
</div>  




<Footer></Footer>
</React.Fragment>)



}