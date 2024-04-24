import React,{useState} from "react"
import './style.css'
import { Overview } from "./top-navbar-components/Overview/Overview";
import { Participants } from "./top-navbar-components/Participants/Participants";
import { Brackets } from "./top-navbar-components/Brackets/Brackets";
import { Announcements } from "./top-navbar-components/Announcements/Announcements";
import { Details } from "./bottom-navbar-components/Details/Details";
import { Prizes } from "./bottom-navbar-components/Prizes/Prizes";
import { Rules } from "./bottom-navbar-components/Rules/Rules";
import { Schedule } from "./bottom-navbar-components/Schedule/Schedule";
import { Contact } from "./bottom-navbar-components/Contact/Contact";
import { ManagementButton } from "./managementButton/ManagementButton";



export const DetailedTournamentCard = ()=>{

    const [activeTopComponent, setActiveTopComponent] = useState(0);

  const handleTopComponent = (componentNumber) => {
    setActiveTopComponent(componentNumber);
  };



  const [activeBottomComponent, setActiveBottomComponent] = useState(0  );

  const handleBottomComponent = (componentNumber) => {
    setActiveBottomComponent(componentNumber);
  };



    const tournament_name ="demo_Tournament"
    const topNavElements = [
        {link:"#",element:"OVERVIEW"},
        {link:"#",element:"PARTICIPANTS"},
        {link:"#",element:"BRACKETS"},
        {link:"#",element:"ANNOUNCEMENTS"},
        



]


const bottomNavElements = [
    {link:"#",element:"DETAILS"},
    {link:"#",element:"RULES"},
    {link:"#",element:"PRIZES"},
    {link:"#",element:"SCHEDULE"},
    {link:"#",element:"CONTACT"}
    



]
const [activeTopNav,setActiveTopNav]=useState(0)
const handleActiveTopNav=(i)=>{
    setActiveTopNav(i)
}


const [activeBottomNav,setActiveBottomNav]=useState(0)
const handleActiveBottomNav=(i)=>{
    setActiveBottomNav(i)
}

const x = `nav-link text-muted`
return(<React.Fragment>

<div  className="container ">
<h2 className="text-start  pb-3" >{tournament_name}</h2>
<div className="card text-center text-white bg-secondary cont-1  " >
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
    {activeTopComponent===1 &&<Participants></Participants>}
    {activeTopComponent===2&&<Brackets></Brackets>}
    {activeTopComponent===3&&<Announcements></Announcements>}
    
    
    
  </div>
  <div className="card-header border">
    <ul className="nav nav-pills card-header-pills my-3 d-flex justify-content-center ">
   


    {bottomNavElements.map((item,index)=>{
        return(
            <li  key ={index} className={`nav-item  ${activeBottomNav === index ? 'active' : ''}`}>
            <a  onClick={() => {
               
                handleBottomComponent(index);
                handleActiveBottomNav(index)
            }} className={`nav-link ${activeBottomNav === index ?'text-white':'text-muted'}`} href={item.link}>{item.element}</a>
          </li>
        )
    })}
    
    </ul>

    {activeBottomComponent===0 && <Details></Details>}
    {activeBottomComponent===1 &&<Rules></Rules>}
    {activeBottomComponent===2&&<Prizes></Prizes>}
    {activeBottomComponent===3&&<Schedule></Schedule>}
    {activeBottomComponent===4&&<Contact/>}
    
    
  </div>
  

  
 
</div>
</div>  





</React.Fragment>)



}