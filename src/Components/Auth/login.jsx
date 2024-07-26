import React, { useState, useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context';

const Login = () => {

    const { loggedIn, login, logOut } = useContext(LoginContext);
console.log("Login context values:", { loggedIn, login, logOut });

    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(credentials.username)
        login(credentials.username, credentials.password)
    }

    // This needs to comem from context
//     return (
//         <>
//     <When condition={loggedIn}>
//           <button onClick={logOut}>Log Out</button>
//         </When>
//       <When condition = {!loggedIn}> 
//         <form onSubmit={handleSubmit}>
//           <input name="username" placeholder="username" onChange={handleChange} />
//           <input name="password" type="password" placeholder="password" onChange={handleChange} />
//           <button type="submit">Login!</button>
//         </form>
//         </When>
//         </>
//   )

return (
    <>
      {loggedIn ? (
        <button onClick={logOut}>Log Out</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="username" onChange={handleChange} />
          <input name="password" type="password" placeholder="password" onChange={handleChange} />
          <button type="submit">Login!</button>
        </form>
      )}
    </>
  );
  

}

export default Login;