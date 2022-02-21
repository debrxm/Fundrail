import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MaterialIcons } from "react-web-vector-icons";
// import logo from "../../assets/icons/logo-icon.svg";
import { colors } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { setCurrentUser } from "../../redux/user/actions";
import { setType, toggleModalVisible } from "../../redux/modal/actions";

import "./styles.scss";

const Header = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const cartTotal = useSelector(({ cart }) => cart.cartTotal);
  const dispatch = useDispatch();
  const userLocation = useSelector(({ user }) => user.location);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {}, []);
  const onLogout = () => {
    auth.signOut();
    dispatch(setCurrentUser(null));
  };
  return (
    <header className="flex-vertical-center header">
      <div className="logo-container">
        <NavLink to="/" state={pathname} className="logo-wrap">
          {/* <img src={logo} alt="FoodSity logo" className={`logo-icon`} /> */}
          <h1 className="logo-text">Fundrail</h1>
        </NavLink>
      </div>
      <nav className="flex-vertical-center navbar">
        <div className="flex-vertical-center left-nav-links">
          <NavLink
            className="nav-link"
            to="/events"
            state={pathname}
            style={pathname === "/events" ? { color: colors.tint } : {}}
          >
            Events
          </NavLink>
        </div>
        <div className="flex-vertical-center right-nav-links">
          {user ? (
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          ) : (
            <>
              <NavLink
                className="nav-link"
                to="/auth/login"
                state={pathname}
                style={pathname === "/auth/login" ? { color: colors.tint } : {}}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
