import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/forgotPassAuth.css";

const ForgotPassAuthLayout = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const { email } = form;
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("handleSubmit");
  };

  const updateForm = () => {
    console.log("updateForm");
  };

  return (
    <div className="password-auth-wrapper">
      {error && <div className="error">{error}</div>}
      <form className="password-auth-form" onSubmit={handleSubmit}>
        <div className="email-div">
          <label htmlFor="email">
            Type the email associated with your account:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={updateForm}
          />
        </div>
        <div className="submit-div">
          <button className="auth-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassAuthLayout;
