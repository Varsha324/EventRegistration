import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // State to manage email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });

      // Extract token and role from response
      const { accessToken, role, userId } = response.data;

      // Store the token in local storage (optional)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem("userId", userId);

      // Navigate based on the role
      if (role === 'admin') {
        navigate('/admin'); // Redirect to admin page
      } else {
        navigate('/student'); // Redirect to student page
      }
    } catch (err) {
      // Handle login error
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account?</p>
      <a href="/signup">SignUp</a>
    </div>
  );
};

export default Login;
