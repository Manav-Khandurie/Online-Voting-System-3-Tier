import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const history = useHistory();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (response.ok) {
          history.push('/home');
        } else {
          // Handle login failure
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    const handleSignup = async () => {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            firstName: 'manav',
            lastName: 'khandurie',
            email,
            password 
          })
        });
  
        if (response.ok) {
          history.push('/home');
        } else {
          // Handle signup failure
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    };
  
    return (
      <div className="login-page">
        <div className="login-form">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="signup-form">
          <h1>Signup</h1>
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
    );
  };

  export default LoginPage;