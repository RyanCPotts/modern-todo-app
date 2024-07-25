import React from 'react'
import { Link } from "react-router-dom";
import {Text} from'@mantine/core'
const Header = () => {
  return(
    <header data-testid = "todo-header">
     <h1 data-testid = "todo-h1">Todo App</h1>
     <nav style = {{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
      <ul style = {{display: "flex"}}>
        <Text><Link to = '/'>Home</Link></Text>
        <Text><Link to = '/settings'>Settings</Link></Text>
      </ul>
      
     </nav>
    </header>
  )
}

export default Header;
