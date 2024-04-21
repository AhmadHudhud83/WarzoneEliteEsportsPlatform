
import "./card.css";
import React from 'react';
export default function Card
({
  imgSrc,
  spanTag,
  constentHead,
  constentPara,
  date,
  time,
  prize,
  proimg,
  proname
}) {
    
  
    return (
        <div className="card" style={{ backgroundImage: `url(${imgSrc})` }} >
    <div className="card-content">
       

      <h2 className="card-title"><span class="tag tag-teal">DONE</span><br/>{constentHead}</h2>
     < div className="card-title"><img className="imgepro " src={proimg}/>
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
        <i className="fas fa-clock" style={{ fontSize: 15, color: "white" ,marginLeft:5}}></i>
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
