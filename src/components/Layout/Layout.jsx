import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MobileHeader from "../MobileHeader/MobileHeader";
import Dialog from "../Dialog/Dialog";
// import { useWindowDimensions } from "../../utils/helper";

import "./styles.scss";
import GetLocation from "../GetLocation/GetLocation";
import { useDispatch, useSelector } from "react-redux";
import { setType, toggleModalVisible } from "../../redux/modal/actions";

const Layout = ({ children, notfound }) => {
  const currentUserLocation = useSelector(({ user }) => user.location);
  const location = useLocation();
  const pathname = location.pathname;
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  const cartTotal = useSelector(({ cart }) => cart.cartTotal);
  const type = useSelector(({ modal }) => modal.type);
  if (isMenuShowing) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }
  const dispatch = useDispatch();
  useEffect(() => {
    currentUserLocation === null &&
      setTimeout(() => {
        dispatch(setType("GetLocation"));
        dispatch(toggleModalVisible(true));
      }, 100);
  }, []);
  useEffect(() => {}, [isMenuShowing]);
  return (
    <>
      {!notfound && (
        <Header
          isMenuShowing={isMenuShowing}
          setIsMenuShowing={setIsMenuShowing}
        />
      )}
      <MobileHeader />
      <Dialog preventDefault>
        {type === "GetLocation" && <GetLocation />}
      </Dialog>
      <div className="children-container">
        {children}
        {pathname !== "/cart" && (
          <div className="mbile-cart-wrapper">
            <NavLink to="/cart">
              <div className="mbile-cart">
                {cartTotal !== 0 && (
                  <div className="flex-center mbile-cart-item-count">
                    <h4>{cartTotal}</h4>
                  </div>
                )}
                <img
                  src={require("../../assets/icons/cart.svg").default}
                  alt="cart-icon"
                  className="mbile-cart-icon"
                />
              </div>
            </NavLink>
          </div>
        )}
      </div>
      {!notfound && <Footer />}
    </>
  );
};

export default Layout;
