import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlayerSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { navigate } = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Password and confirm password do not match');
            return;
        }

        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/player/signup', formData, { withCredentials: true });
            if (response.data) {
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
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control bg-dark text-white p-3 mt-2" id="email" name="email" required placeholder="Enter your email" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control bg-dark text-white p-3 mt-2" id="password" name="password" required placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className="form-control bg-dark text-white p-3 mt-2" id="confirmPassword" name="confirmPassword" required placeholder="Confirm Password" onChange={handleChange} />
                        </div>

                        <p>Already have account? <a href="/login">Login</a></p>

                        <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlayerSignup;