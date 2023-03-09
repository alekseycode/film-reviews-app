import { NavLink } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import '../stylesheets/navigation.css'
import { useState } from "react";

export const Navigation = () => {
  const [cookie, setCookie] = useState();
   
  async function getCookie() {
     const session = await axios.get(`${API_URL}/auth/session`)
     setCookie(session.data)
     console.log(cookie);
  }

  return (
    <nav>
    <NavLink to="/" onClick={getCookie}>Home</NavLink>
    <NavLink to="films" onClick={getCookie}>Films</NavLink>
    <NavLink to="login" onClick={getCookie}>Log In</NavLink>
    </nav>
  );
}



