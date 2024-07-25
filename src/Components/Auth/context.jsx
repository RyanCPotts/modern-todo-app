import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';  // Correct import
import axios from 'axios'
import cookie from 'react-cookies';

export const LoginContext = React.createContext();

const testUsers = {
  admin: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  editor: {
    password: 'EDITOR',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  writer: {
    password: 'WRITER',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  user: {
    password: 'USER',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

const LoginProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user.capabilities && user.capabilities.includes(capability);
  };

  // const login = (username, password) => {
    
  //   const validUser = testUsers[username];

  //   console.log('valid user', validUser)
  //   if (validUser && validUser.password === password) {
  //     try {
  //       const validToken = jwt_decode(validUser.token);
  //       console.log('valid token', validToken)
  //       setLoggedIn(true);
  //       setUser({ name: validUser.name, capabilities: validToken.capabilities });
  //       setError(null);
  //       cookie.save('auth', validUser.token);
  //     } catch (e) {
  //       setUser(null);
  //       setLoggedIn(false);
  //       setError(e.message);
  //       console.error('token decode error', e);
  //     }
  //   } else {
  //     setLoggedIn(false);
  //     setUser(null);
  //     setError('Please enter a valid username or password');
  //   }
  // };

  const login = async (username, password) => {
    try {
      // Make a POST request to the signin endpoint with username and password
      const response = await axios.post(`${import.meta.env.VITE_API}/signin`, {
        username,
        password
      });
  
      // Log the response for debugging
      console.log('API response:', response);
  
      // Check if the response status is not OK
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      // Extract the token from the response data
      const { token } = response.data;
  
      // Decode the token to get user information
      const validToken = jwt_decode(token);
  
      // Update the state with user details
      setUser({
        name: validToken.name,
        capabilities: validToken.capabilities,
      });
      setLoggedIn(true);
      setError(null);
  
      // Save the token in cookies
      cookie.save('auth', token);
    } catch (error) {
      // Handle errors and update state accordingly
      setUser(null);
      setLoggedIn(false);
      setError(error.message);
      console.error('Login error:', error);
    }
  };
  
  

  const logOut = () => {
    setLoggedIn(false);
    setUser(null);
    cookie.remove('auth');
  };

  useEffect(() => {
    const token = cookie.load('auth');
    if (token) {
      try {
        const validToken = jwt_decode(token);
        setUser({ name: validToken.name, capabilities: validToken.capabilities });
        setLoggedIn(true);
        
      } catch (e) {
        setUser(null);
        setLoggedIn(false);
        setError(e.message);
        console.error('token decode error', e);
      }
    }
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, user, login, logOut, can, error }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
