import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function EditePlayer(){
    const { playerId } = useParams();
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:''
      });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });

        if (name === 'name') {
            if (value.length < 4) {
                setNameError('Name must be at least 4 characters long');
            } else if (!/^[a-zA-Z]+$/.test(value)) {
                setNameError('Name must contain only alphabetic characters');
            } else {
                setNameError('');
            }
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(value)) {
                setPasswordError('Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter and 1 number.');
            } else {
                setPasswordError('');
            }
        }
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/player/update', {
                id:playerId,
                ...formData
            });
            alert(response.data);

        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to update user. Please check the fields according to the required conditions.');
        }

      };
    



    useEffect(() => {
        axios.get(`http://localhost:5000/player/get?id=${playerId}`)
          .then(response => {
            if(response.data !== "Player not found"){
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    password:''
                });
            }
           
          })
          .catch(error => {
            console.error('Error display Supervisors:', error);
          });

    }, [playerId]);
   
    return(
        
        <div className="container">
            
            <div className="mt-5">
                <h1 className="text-center">Edit Player</h1>
                <form onSubmit={handleSubmit}  className="col-md-6 mx-auto mt-5">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input  type="text" className="form-control" id="name" name="name" required value={formData.name}  onChange={handleChange} />
                        {nameError && <div className="text-danger">{nameError}</div>}                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" required value={formData.email}   onChange={handleChange}   />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input  type="password" className="form-control" id="password" name="password" required onChange={handleChange}  />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="d-flex justify-content-end ">
                        <div className="p-2">
                            <Link to="/organizer/player/list" className="btn btn-outline-light btn-secondary">Back</Link>
                        </div>
                        <div className="p-2">
                            <button type="submit" className="btn  btn-outline-light btn-primary mr-2">Submit</button>
                        </div>
                    </div>
                </form>
             
            </div>
           
            
        </div>
        
    );
}

export default EditePlayer;