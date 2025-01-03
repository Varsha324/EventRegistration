import React, { useState } from 'react';
import { signUpUser } from '../Api'; // Adjust the path as needed
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUpUser(formData);
            alert("User registered successfully");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className='signup'>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Signup;
