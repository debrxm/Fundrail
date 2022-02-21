import React, { useState } from "react";
import { auth } from "../../firebase/config";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { colors } from "../../constants/Colors";
import Spacing from "../../components/Spacing/Spacing";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await auth.sendPasswordResetEmail(email);
      setEmail("");
      navigate(`/auth/login`);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="forgot-password">
      <div className="forgot-password-box">
        {errorMessage !== "" ? (
          <CustomPopUp
            message={`${errorMessage}`}
            type={"error"}
            customStyles={{ backgroundColor: colors.danger }}
            customTextStyles={{ color: colors.white }}
          />
        ) : null}
        <div className="form-container">
          <h2>Reset Password</h2>
          <Spacing height="2em" />
          <form className="form" onSubmit={onSubmit}>
            <div className="group">
              <label className="form-input-label">Email </label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span
              onClick={() => navigate(`/auth/login`)}
              className="back-to-login"
            >
              Back to login
            </span>
            <button className="btn" onClick={onSubmit} disabled={loading}>
              {loading ? (
                <img
                  alt=""
                  src={require(`../../assets/loader.gif`).default}
                  style={{ height: "2em", width: "2em" }}
                  className="auth-loading"
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
