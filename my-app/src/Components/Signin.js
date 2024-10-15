import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext';
import { useContext } from 'react';

const SignInForm = () => {

  const {handleLogin} = useContext(MyContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation

    if (email === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    // Fetch users from JSON file
    try {
      const response = await fetch('http://localhost:8000/Users'); // Update the path to your JSON file
      const users = await response.json();
      
      // Check if user credentials are valid
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {

        // Redirect to the homepage or another page on successful sign-in
        handleLogin(email);

        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      {error && <p className="signin-error">{error}</p>}
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
        <div className="signup-link">
          <p>Don't have an account?</p>
          <a href="/signup" className="signup-button">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
