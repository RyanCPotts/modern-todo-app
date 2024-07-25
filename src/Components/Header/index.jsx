import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return(
    <header data-testid = "todo-header">
     <h1 data-testid = "todo-h1">Todo App</h1>
     <nav>
      <Link to = '/'>Home</Link>|<Link to = '/settings'>Settings</Link>
     </nav>
    </header>
  )
}

export default Header;
