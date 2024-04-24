
import "./card.css";
import React from 'react';
export default function Card
({
  imgSrc,
 
  constentHead,
  
  date,
  time,
  prize,
  proimg,
  proname,
  statet
}) {
    
  
    return (

      <div className="card" style={{ backgroundImage: `url(${imgSrc})` }} >
      <div className="card-content">
         
  
        <h3 className="card-title"><span className="tag tag-teal">{statet}</span><br/><div className="name">{constentHead}</div></h3>
       < div className="card-title oppro"><img className="imgepro " src={proimg}/>
       <span >{proname}</span></div>
      
        <div className="card-body card__footer">
        <div >
        <label>Date</label>
        <i className="fa fa-calendar" style={{ fontSize: 15, color: "white" ,marginLeft:5}}></i>
          <div>
            <p>{date}</p>
          </div>
          
        </div>
       
        <div >
          <div>
          <label>Time</label>
    <i className="fas fa-clock" style={{ fontSize:15, color: "white" ,marginLeft:5}}></i>
            <p>{time}</p>
           
          </div>
          
        </div>
        <div >
         
          <label>Prize</label>
         <i className="fas fa-award" style={{ fontSize: 15, color: "white" ,marginLeft:5}}></i>
          <div>
            <p>{prize}</p>
          </div>
        </div>
      </div>
  
        <button href="#" className="button">Learn More</button>
        
      </div>
    </div>
    
  
    );
  
    
    
}
