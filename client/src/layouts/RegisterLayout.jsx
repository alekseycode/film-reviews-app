import "../stylesheets/registerLayout.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterLayout = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { username, password } = form;

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  const updateForm = () => {
    console.log("updateForm");
  };

  return (
    <div className="wrapper">
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
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
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
