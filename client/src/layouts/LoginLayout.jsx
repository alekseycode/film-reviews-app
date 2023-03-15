import "../stylesheets/loginLayout.css";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginLayout() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { username, password } = form;

  const updateForm = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/", {
        replace: true,
      });
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="log-in-wrapper">
      {error && <div className="error">{error}</div>}
      <form className="log-in-form" onSubmit={handleSubmit}>
        <div className="username-div">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={updateForm}
          />
        </div>
        <div className="password-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={updateForm}
          />
        </div>
        <div className="submit-div">
          <Link to="/forgotPass">Forgot Password</Link>
          <Link to="/register">Sign up</Link>
          <button className="log-in-btn" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
