import React, { useState } from "react"
import './Announcements.css'
export const Announcements=()=>{

const [AnnouncementsArr,setAnnouncementsArr] = useState([
    {name:"Ahmad",no:"1",title:"lorem ipsum"},
    {name:"Osama",no:"2",title:"lorem ipsum"},
    {name:"Rama",no:"3",title:"lorem ipsum"},
    {name:"Areen",no:"4",title:"lorem ipsum"},
 
]

)
const [inputValue, setInputValue]=useState("")

const handleInputChange = (e) => {
    setInputValue(e.target.value);
}

const handleAddInput = () => {
    if (inputValue.trim() !== "") { 
        const newAnnouncement = {
            name: "Organizer",
            no: AnnouncementsArr.length + 1,
            title: inputValue
        }
        setAnnouncementsArr([...AnnouncementsArr, newAnnouncement]);
        setInputValue("") 
    }
}

    return(<React.Fragment>
      
<div  className="d-flex mx-5"> <h5 className="text-start my-3 me-auto">Participants</h5> 
<div style={{width:"50%"}} className="input-group my-3 ">
  <input   value={inputValue} onChange={handleInputChange} type="text" className="form-control "  aria-label="Recipient's username" aria-describedby="button-addon2" />
  <button onClick={handleAddInput}  className="btn btn-secondary" type="button" id="button-addon2">Send</button>
</div>
</div>
<ol className="list-group list-group-numbered " >

{AnnouncementsArr.map((i,e)=>{

return(
  <li className="list-group-item bg-dark text-white d-flex justify-content-between align-items-start">
    
    <div className="ms-2 me-auto" >
      <div  className="fw-bold" >{i.name}</div>
   {i.title}
    </div>
    <span className="badge  rounded-pill">{i.no}</span>
  </li>
 
)
})}


</ol>


            
         
            
        
        
        

        
        
        
        
        
        </React.Fragment>)
}