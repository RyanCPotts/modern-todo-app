import React, { useCallback, useState, useEffect, createContext } from 'react';
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
const capabilities = {
  "Administrator": ["create", "update", "delete"],
  "Editor": ["create", "update"],
  "Writer": ["create"],
  "User": [],
}
const LoginProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({capabilities:[]});
  const [error, setError] = useState(null);
  

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
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


  // const login = async (username, password) => {
  //   try {
  //     // Make a POST request to the signin endpoint with username and password
  //     const config = {
  //       baseURL: `${import.meta.env.VITE_API}`,  // Adjust baseURL as needed
  //       url: '/signin',
  //       method: 'post',
  //       auth: { username, password }
  //     };
      
  //     const response = await axios(config);
  
  //     // Ensure the response is valid
  //     if (response.status !== 200) {
  //       throw new Error(`Login failed with status code: ${response.status}`);
  //     }
  
  //     // Extract the token from the response data
  //     const { token } = response.data;
      
  //     if (!token) {
  //       throw new Error('No token received from the server');
  //     }
      
  //     // Decode the token to get user information
  //     const validToken = jwt_decode(token);
  //     validToken.capabilities = capabilities[validToken.username] || [];
  
  //     // Update the state with user details
  //     setUser({
  //       name: validToken.name,
  //       capabilities: validToken.capabilities,
  //     });
  //     setLoggedIn(true);
  //     setError(null);
  
  //     // Save the token in cookies
  //     cookie.save('auth', token);
  //   } catch (error) {
  //     // Handle errors and update state accordingly
  //     setUser({ capabilities: [] });  // Ensure capabilities is always an array
  //     setLoggedIn(false);
  //     setError(error.message || 'An error occurred during login');
  //     console.error('Login error:', error);
  //   }
  // };
  const login = async (username, password) => {
    try {
      const config = {
        baseURL: `${import.meta.env.VITE_API}`,
        url: '/signin',
        method: 'post',
        auth: { username, password }
      };
      
      const response = await axios(config);
  
      if (response.status !== 200) {
        throw new Error(`Login failed with status code: ${response.status}`);
      }
  
      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received from the server');
      }
  
      const validToken = jwt_decode(token);
      console.log('Decoded Token:', validToken);
  
      validToken.capabilities = capabilities[validToken.username] || [];
  
      console.log('Valid Token with capabilities:', validToken);
  
      setUser({
        name: validToken.username,
        capabilities: validToken.capabilities,
      });
      setLoggedIn(true);
      setError(null);
      cookie.save('auth', token);
    } catch (error) {
      setUser({ capabilities: [] });
      setLoggedIn(false);
      setError(error.message || 'An error occurred during login');
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
