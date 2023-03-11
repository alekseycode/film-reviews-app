import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../stylesheets/navigation.css";

export const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="films">Films</NavLink>
      {user.userId ? (
        <p to="login" onClick={logout}>
          Log Out
        </p>
      ) : (
        <NavLink to="login">Log In</NavLink>
      )}
    </nav>
  );
};
