import React, { useState } from "react";
import Helmet from "react-helmet";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import Spacing from "../../components/Spacing/Spacing";
import { colors } from "../../constants/Colors";
import { auth } from "../../firebase/config";

import "./styles.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setErrorMessage(
            "The password is invalid or the user does not have a password."
          )
        : error.code === "auth/user-not-found"
        ? setErrorMessage(
            "There is no user record corresponding to this identifier."
          )
        : setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Fundrail &mdash; Login to an Account</title>
        <meta
          property="og:title"
          content="Fundrail &mdash; Login to an Account"
        />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta
          property="og:site_name"
          content="Fundrail &mdash; Login to an Account"
        />
        <meta property="og:url" content="https://www.Fundrail.com" />
      </Helmet>
      <div className={`flex-center-column login`}>
        {errorMessage !== "" ? (
          <CustomPopUp
            message={`${errorMessage}`}
            type={"error"}
            customStyles={{ backgroundColor: colors.danger }}
            customTextStyles={{ color: colors.white }}
          />
        ) : null}
        <Spacing height="3em" />
        <div className="form-container">
          <h2>Log In</h2>
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
            <div className="group">
              <label className="form-input-label">Password </label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span
              onClick={() => navigate(`/auth/forgot-password`)}
              className="forgot-password"
            >
              Forgotten password?
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
            <Spacing height="4em" />
            <div className="alt-text">
              <span>Don't have an account?</span>
              <NavLink to={!loading && "/auth/register"}>
                <button className="btn outline-btn">Sign Up</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Spacing height="4em" />
    </>
  );
};

export default Login;
