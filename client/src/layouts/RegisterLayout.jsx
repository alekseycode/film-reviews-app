import "../stylesheets/registerLayout.css";

import { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const RegisterLayout = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { username, password, confirmPassword } = form;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, form);
      navigate("/login", {
        replace: true,
      });
    } catch (e) {
      setError(e.response.data.error);
      console.log(e);
    }
    console.log(form);
  };

  const updateForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(form);
  };

  return (
    <div className="register-wrapper">
      {error && <div className="error">{error}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
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
        <div className="password-div">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            value={confirmPassword}
            onChange={updateForm}
          />
        </div>
        <div className="submit-div">
          <button className="register-btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterLayout;
