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

        if (!formData.name) {
            alert('Name is required');
            return;
        }

        if (!/^[A-Za-z]+$/.test(formData.name) || formData.name.length < 4) {
            alert('Name must be alpha (a-z & A-Z) and at least 4 characters long');
            return;
        }

        if (!formData.email) {
            alert('Email is required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert('Email must be valid and include @');
            return;
        }

        if (!formData.password) {
            alert('Password is required');
            return;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/.test(formData.password)) {
            alert('Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Password and confirm password do not match');
            return;
        }


        axios.post('http://localhost:5000/player/signup', formData, { withCredentials: true }).then((response) => {
            if (response.data) {
                navigate('/');
            }
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert('Player signuped successfully!');
            }
        });

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