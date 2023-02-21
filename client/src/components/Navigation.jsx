import { NavLink } from "react-router-dom";
import '../stylesheets/navigation.css'

export const Navigation = () => {
  return (
    <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="films">Films</NavLink>
    <NavLink to="login">Log In</NavLink>
    </nav>
  );
}