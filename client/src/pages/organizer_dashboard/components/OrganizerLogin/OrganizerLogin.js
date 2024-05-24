import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

const OrganizerLogin = () => {
    const [formData, setFormData] = useState({
        name:'',
        password:''
      });

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };


      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/organizer/login', formData , { withCredentials: true });
            alert(response.data);
            //sessionStorage.setItem('sessionToken', response.data.token);
            console.log(response.data);
            

        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user. Please check the fields according to the required conditions.');
        }
      };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" required placeholder="Enter your name" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" required placeholder="Password" onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/#">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerLogin;