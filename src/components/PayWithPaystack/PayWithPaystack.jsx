import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paystackLiveKeys } from "../../configs/apiKeys";
import { onCheckoutCart } from "../../firebase/firestore";
import { updateCart, updateCartItemCount } from "../../redux/cart/actions";

import "./styles.scss";

const PayWithPaystack = ({ amount, setLoading, cart, label }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const currentUserLocation = useSelector(({ user }) => user.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = {
    reference: new Date().getTime().toString(),
    email: currentUser?.email || "anonymous@gmail.com",
    amount: amount * 100,
    publicKey: paystackLiveKeys.public,
  };
  const initializePayment = usePaystackPayment(config);
  const cleanUp = () => {
    setLoading(false);
    dispatch(updateCart([]));
    dispatch(updateCartItemCount(0));
  };
  const onSuccess = (reference) => {
    setLoading(true);
    onCheckoutCart(cart, currentUser, reference, cleanUp);
  };

  const onClose = () => {
    console.log("closed");
  };
  return (
    <div>
      <button
        className=" pay-now-btn"
        onClick={() => {
          currentUserLocation && currentUser
            ? initializePayment(onSuccess, onClose)
            : navigate(`/auth/login`);
        }}
        disabled={amount <= 0}
      >
        {label}
      </button>
    </div>
  );
};

export default PayWithPaystack;
