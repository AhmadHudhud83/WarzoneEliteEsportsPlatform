import"./style.css";
import { useState, useRef, useEffect } from "react";

const SupervisorAndSponsors =()=>{
    const[showAddSupervisorsForm , setShowAddSupervisorsForm]=useState(false);
    const[showAddSponsorsForm , setshowAddSponsorsForm]=useState(false);

    const [Supervisors, setSupervisors] = useState([]);
    const[Sponsors , setSponsors] = useState([]);

    const [inputValue, setInputValue] = useState('');
    const addUserRef = useRef(null);


    

    const ClickToAddSupervisors =()=>{
        setShowAddSupervisorsForm(true);
    }

    const ClickToAddSponsors =()=>{
        setshowAddSponsorsForm(true);
    }



    const handleInputChange  = (event)=>{
        setInputValue(event.target.value);
    }

    const handleDeleteSupervisors = (index) => {
        setSupervisors(prevSupervisors => prevSupervisors.filter((_, i) => i !== index));
    };

    const handleAddSupervisors  =()=>{
        if (inputValue.trim() !== '') {
            setSupervisors(prevSupervisors => prevSupervisors.concat(inputValue.trim()));
            setInputValue('');
        }
    }

    const handleAddSponsors  =()=>{
        if (inputValue.trim() !== '') {
            setSponsors(prevSupervisors => prevSupervisors.concat(inputValue.trim()));
            setInputValue('');
        }
    }

    const handleDeleteSponsors = (index) => {
        setSponsors(prevSupervisors => prevSupervisors.filter((_, i) => i !== index));
    };


    const handleClickOutside = (event) => {
        if (addUserRef.current && !addUserRef.current.contains(event.target)) {
          setShowAddSupervisorsForm(false);
          setshowAddSponsorsForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);


    return(
        <div className="background">
            <div className="container">
                <div class="title">
                    <h1>Supervisors & Sponsors</h1>
                </div>

                <div className="container-tow">
                    <div className="container-three">
                        <div class="add-button">
                            <button onClick={ClickToAddSupervisors}>+ Add Supervisors</button>
                        </div>

                        {showAddSupervisorsForm && 
                            <div className="add-form" ref={addUserRef}>
                                <input  onChange={handleInputChange } placeholder="name" />
                                <button onClick={handleAddSupervisors }>+ Add</button>
                            </div>
                        }

                        

                        {
                            Supervisors.length > 0 ? 
                                (
                                    <div className="Supervisors-Sponsors-result">
                                         <table>
                                           
                                                <tr>
                                                    <th scope="col">name</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            
                                            
                                                {Supervisors.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{user}</td>
                                                        <td><button class="btn btn-danger" onClick={() => handleDeleteSupervisors(index)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            
                                        </table>
                                        
                                    </div>
                                    
                                ) : 
                                (
                                        <div class="result">
                                            <p>There are no supervisors yet.</p>
                                        </div>
                                )
                        }

                    </div>

                    <div className="container-three">
                        <div class="add-button">
                            <button onClick={ClickToAddSponsors}>+ Add Sponsors</button>
                        </div>

                        {showAddSponsorsForm && 
                            <div className="add-form" ref={addUserRef}>
                                <input onChange={handleInputChange } placeholder="name" />
                                <button onClick={handleAddSponsors }>+ Add</button>
                            </div>
                        }

    
                        {
                            Sponsors.length > 0 ? 
                                (
                                    <div className="Supervisors-Sponsors-result">
                                        <table>
                                           
                                            <tr>
                                                <th scope="col">name</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        
                                        
                                            {Sponsors.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user}</td>
                                                    <td><button class="btn btn-danger" onClick={() => handleDeleteSponsors(index)}>Delete</button></td>
                                                </tr>
                                            ))}
                                            
                                        </table>
                                        
                                    </div>
                                    
                                ) : 
                                (
                                    <div class="result">
                                        <p>There are no Sponsors yet.</p>
                                    </div>
                                )
                        }

                    </div>

                    
                </div>
                

                    
                

            </div>
        </div>
    )
}

export {SupervisorAndSponsors};