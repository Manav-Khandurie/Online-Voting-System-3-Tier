import  { useState } from 'react';
import axios from 'axios';
// import './App.css';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSignIn = () => {
    const userData = {
      firstName,
      lastName,
      email,
      password
    };

    axios.post(API_ENDPOINT+'register', userData)
      .then(response => {
        console.log('Sign in successful:', response.data);
        setToken(response.data.token); // Set the token state
        setMessage('Sign up successful!'); // Set success message state
        setError(null); // Reset error state
      })
      .catch(error => {
        console.error('Sign in failed:', error);
        setToken(null); // Reset token state
        setMessage(null); // Reset success message state
        setError(error.message); // Set error message state
      });
  };

  const handleLogin = () => {
    const userData = {
      email,
      password
    };

    axios.post(API_ENDPOINT+'login', userData)
      .then(response => {
        console.log('Login successful:', response.data);
        setToken(response.data.token); // Set the token state
        setMessage('Login successful!'); // Set success message state
        setError(null); // Reset error state
      })
      .catch(error => {
        console.error('Login failed:', error);
        setToken(null); // Reset token state
        setMessage(null); // Reset success message state
        setError(error.message); // Set error message state
      });
  };

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="login-container">
        <h2>{isNewUser ? 'Sign Up' : 'Login'}</h2>
        {isNewUser && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
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
        {isNewUser ? (
          <button onClick={handleSignIn}>Sign Up</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        {token && <p>{message} <br /> Token === {token} </p>} 
        {error && <p>Error: {error}</p>} 
        <p onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? 'Already have an account? Login' : 'New user? Sign up here'}
        </p>
      </div>
    </div>
  );
};

export default App;
