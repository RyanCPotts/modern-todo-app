import { Link } from "react-router-dom";

const Header = () => {
  return(
    <header>
     <h1>Todo App</h1>
     <nav>
      <Link to = '/'>Home</Link>|<Link to = '/settings'>Settings</Link>
     </nav>
    </header>
  )
}

export default Header;
