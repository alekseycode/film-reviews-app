import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { API_URL } from "../constants";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});

  const login = async (credentials) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });

    const { username, id } = data;

    setUser({ username, userId: id });
  };

  const logout = async () => {
    await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    console.log("User logged out");
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
