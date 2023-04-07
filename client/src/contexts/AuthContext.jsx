import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { API_URL } from "../constants";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/getSession`, {
          withCredentials: true,
        });
        setUserLoading(false);
        const sessionData = response.data.session[0];
        setUser({
          username: sessionData.username,
          userId: sessionData.user_id,
          sessionId: sessionData.id,
        });
      } catch (error) {
        console.error(error);
        setUserLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (credentials) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });

    const { username, id, sessionId } = data;

    setUser({ username, userId: id, sessionId });
  };

  const logout = async () => {
    await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!userLoading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
