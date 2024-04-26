import"./style.css";
import { useState } from "react";



const PublishTournement = () =>{

 const [isChecked, setIsChecked] = useState(false);

 const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    setIsButtonDisabled(!newValue);
  };

    return(
    
        <div className = "background-checkbox">

            <div className="container-checkbox">
                <div className="sup">
                    <h1>Publish</h1>
                </div>
                <div className="description">
                    <label> Publishing this tournament will enable registration and allow players to join</label>
                </div>
                <div className="description">
                    <label>By publoshing you agree to our website policy and community standards</label>
                </div>

                <div className="checkbox-cont">
                    <input type="checkbox" 
                    checked={isChecked}
                    onChange={handleCheckboxChange}/>
                    <label style={{ color: isChecked ? 'white' : 'gray' }} > I agree to website policy & community standards</label>       
                </div>
            
            </div>

            <div className="buttons">
                <button>Back</button>
                <button  
                disabled={isButtonDisabled}>
                    Publish
                </button>
            </div>
        </div>
    
    );
};

export{PublishTournement}