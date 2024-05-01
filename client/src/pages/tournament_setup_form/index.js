import React from "react"
import { useState } from "react";
export const TournamentSetupForm=(props)=>{


    const [activeTopComponent, setActiveTopComponent] = useState(0);

    const handleTopComponent = (componentNumber) => {
      setActiveTopComponent(componentNumber);
    };
    
    
    
    
    
    
     
      const topNavElements = [
          {link:"#",element:"BASICS"},
          {link:"#",element:"INFO"},
          {link:"#",element:"SETTINGS"},
          {link:"#",element:"PUBLISH"},
          
    
    ]
    
    
    
    const [activeTopNav,setActiveTopNav]=useState(0)
    const handleActiveTopNav=(i)=>{
      setActiveTopNav(i)
    }
    


    return(<React.Fragment>
         
        



  <div  className="container pt-5 mt-5 org-cont " >

<div className="card  text-white bg-secondary cont-1  " >
  <div className="card-header border ">
    <div className="border-bottom">
    <ul className="nav nav-pills card-header-pills my-3 py-2 d-flex justify-content-center">
   
    {topNavElements.map((item,index)=>{
        return(
            <li  key ={index} className={`nav-item fs-3   ${activeTopNav === index ? 'active border-bottom border-4 border-danger' : ''}`}>
            <a  onClick={() =>{
           handleTopComponent(index);
            handleActiveTopNav(index)}
            } className={`nav-link ${activeTopNav === index ? 'text-white' : 'text-muted'}`} href={item.link}>{item.element}</a>
          </li>
        )
    })}
    
    {props.children}
   
    </ul>
    
    </div>
    {activeTopComponent===0 && <h1>Hello world 1</h1>}
    {activeTopComponent===1 && <h1>Hello world 2</h1>}
    {activeTopComponent===2 && <h1>Hello world 3</h1>}
    {activeTopComponent===3 && <h1>Hello world 4</h1>}
    
    
    
  </div>
  
  

  
 
</div>
</div>  



        
        </React.Fragment>)
}