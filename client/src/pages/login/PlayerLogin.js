import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PlayerLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/player/login', formData, { withCredentials: true });
            if (response.data) {
                sessionStorage.setItem('player_id', response.data.user_id);
                navigate('/');
            }
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                alert(error.response.data);
            }

            else {
                alert('system busy try again later');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="row w-100">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center mb-4">WARZONE Elite</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control bg-dark text-white p-3 mt-2" id="name" name="name" required placeholder="Enter your name" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control bg-dark text-white p-3 mt-2" id="password" name="password" required placeholder="Password" onChange={handleChange} />
                        </div>

                        <p>Don't have an account? <a href="/signup">Sign up</a></p>

                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default PlayerLogin;