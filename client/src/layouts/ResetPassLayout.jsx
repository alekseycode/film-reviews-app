import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import "../stylesheets/resetPassLayout.css";

const ResetPassLayout = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = form;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/auth/newPass`, form);
      navigate("/login", { replace: true });
    } catch (e) {
      setError(e.response.data.error);
      console.log(e);
    }
  };

  const updateForm = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="reset-pass-wrapper">
      {error && <div className="error">{error}</div>}
      <form className="reset-pass-form" onSubmit={handleSubmit}>
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
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={updateForm}
          />
        </div>
        <div className="password-div">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            value={confirmPassword}
            onChange={updateForm}
          />
        </div>
        <div className="submit-div">
          <button className="reset-btn" type="submit">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassLayout;
