// import React, { useState, useEffect, createContext } from 'react';
// import {jwtDecode} from 'jwt-decode';

// import cookie from 'react-cookies'

// export const LoginContext = React.createContext();

// const testUsers = {
//   admin: {
//     password: 'admin',
//     name: 'Administrator',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
//   },
//   editor: {
//     password: 'EDITOR',
//     name: 'Editor',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
//   },
//   writer: {
//     password: 'WRITER',
//     name: 'Writer',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
//   },
//   user: {
//     password: 'USER',
//     name: 'User',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
//   },
// };

// const LoginProvider = ({children})=> {

//   const [loggedIn, setLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null) 

//   // can('delete') should return true or false
//   const can = (capability)=> {
//     return user.capabilities && user.capabilities.includes(capability);
//   }

//   // Pretending to login
//   // Really ... we should be calling the API to validate the user
//   // The API would return a token
//   const login = (username, password)=> {
//     let validUser = testUsers[username];
//     if (validUser && validUser.password === password) {
//     //   validateToken(validUser.token);
//     try {
//         let validToken = jwtDecode(validUser.token);
//         setUser({name: validUser.name, capabilities: validToken.capabilities});
//         setLoggedIn(true);
//         setError(null)
//         cookie.save('auth', validUser.token);
//       } catch (e) {
//         setUser(null);
//         setLoggedIn(false);
//         setError(e.message);
//         console.error('token decode error', e)
//       }
//     }
//     else{
//         setLoggedIn(false);
//         setUser(null);
//         setError('please enter valid username or password');
//     }
//   }

//   const logOut=()=> {
//     setLoggedIn(false);
//     setUser(null);
//     cookie.remove('auth');
//   }

// //   function validateToken(token) {
// //     try {
// //       let validUser = jwt_decode(token);
// //       setUser(validUser);
// //       setLoggedIn(true);
// //       localStorage.setItem('token', token);
// //     } catch (e) {
// //       setUser({});
// //       setLoggedIn(false);
// //     }
// //   }

//   useEffect(() => {
//     let token = cookie.load('auth');
//     if (token) {
//         try {
//             let validToken = jwtDecode(token);
//             setUser({name: validToken.name, capabilities: validToken.capabilities});
//             setLoggedIn(true);
//             setError(null)
//             // cookie.save('auth', validUser.token);
//           } catch (e) {
//             setUser(null);
//             setLoggedIn(false);
//             setError(e.message);
//             console.error('token decode error', e)
//           }
//     }
//   }, []);

//   return (
//     <LoginContext.Provider value={{ loggedIn, user, login, logOut, can, error }}>
//       {children}
//     </LoginContext.Provider>
//   )
// }

// export default LoginProvider;

import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';  // Correct import

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

  const login = (username, password) => {
    const validUser = testUsers[username];
    if (validUser && validUser.password === password) {
      try {
        const validToken = jwt_decode(validUser.token);
        console.log('valid token', validToken)
        setLoggedIn(true);
        setUser({ name: validUser.name, capabilities: validToken.capabilities });
        setError(null);
        cookie.save('auth', validUser.token);
      } catch (e) {
        setUser(null);
        setLoggedIn(false);
        setError(e.message);
        console.error('token decode error', e);
      }
    } else {
      setLoggedIn(false);
      setUser(null);
      setError('Please enter a valid username or password');
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
