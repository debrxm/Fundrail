import React, { useState } from "react";
import Helmet from "react-helmet";
import { NavLink } from "react-router-dom";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import Spacing from "../../components/Spacing/Spacing";
import { colors } from "../../constants/Colors";
import { createUserProfileDocument } from "../../firebase/auth";
import { auth } from "../../firebase/config";

import "./styles.scss";

const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    if (password !== confirmPassword) {
      setLoading(false);
      setErrorMessage(`Password did not match!`);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, {
        first_name,
        last_name,
        phone,
      });
      setLoading(false);
    } catch (error) {
      error.code === "auth/email-already-in-use"
        ? setErrorMessage(
            "The email address is already in use by another account"
          )
        : error.code === "auth/weak-password"
        ? setErrorMessage("Password should be at least 6 characters")
        : setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Fundrail &mdash; Creat an Account</title>
        <meta property="og:title" content="Fundrail &mdash; Creat an Account" />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta
          property="og:site_name"
          content="Fundrail &mdash; Creat an Account"
        />
        <meta property="og:url" content="https://www.Fundrail.com" />
      </Helmet>
      <div className={`flex-center-column register`}>
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
          <h2>Create an Account</h2>
          <Spacing height="2em" />
          <form className="form" onSubmit={onSubmit}>
            <div className="group">
              <label className="form-input-label"> First Name </label>
              <input
                className="form-input"
                type="text"
                name="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className="group">
              <label className="form-input-label"> Last Name </label>
              <input
                className="form-input"
                type="text"
                name="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>

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
              <label className="form-input-label">Phone Number </label>
              <input
                className="form-input"
                type="number"
                name="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <div className="group">
              <label className="form-input-label">Confirm Password </label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn" onClick={onSubmit} disabled={loading}>
              {loading ? (
                <img
                  alt=""
                  src={require(`../../assets/loader.gif`).default}
                  style={{ height: "2em", width: "2em" }}
                  className="auth-loading"
                />
              ) : (
                "Create"
              )}
            </button>
            <Spacing height="4em" />
            <div className="alt-text">
              <span>Already have an account?</span>
              <NavLink to={!loading && "/auth/login"}>
                <button className="btn outline-btn">Log In</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Spacing height="4em" />
    </>
  );
};

export default Register;
