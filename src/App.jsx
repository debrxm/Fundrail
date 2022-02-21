import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setCurrentUserLocation } from "./redux/user/actions";
import { auth } from "./firebase/config";
import { createUserProfileDocument } from "./firebase/auth";

// COMPONENTS
import Layout from "./components/Layout/Layout";
import Spinner from "./components/Spinner/Spinner";

// PAGES
import Home from "./screens/Home/Home";
import Register from "./screens/Register/Register";
import Login from "./screens/Login/Login";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import NotFound from "./screens/NotFound/NotFound";

// STYLES
import "./App.scss";

const App = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const currentUserLocation = useSelector(({ user }) => user.location);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const GetUser = useCallback((ref) => {
    ref.onSnapshot((snapShot) => {
      dispatch(setCurrentUserLocation(currentUserLocation));
      console.log(ref, snapShot.data());
      dispatch(setCurrentUser(snapShot.data()));
      setLoading(false);
    });
  });
  const checkUser = useCallback(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef = await createUserProfileDocument(
            userAuth,
            {},
            GetUser
          );
          console.log(userRef);
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  }, [dispatch]);
  useEffect(() => {
    checkUser();
    if (!JSON.parse(sessionStorage.getItem("reauthenticate"))) {
      sessionStorage.setItem(
        "reauthenticate",
        JSON.stringify({ status: false })
      );
    }
  }, [checkUser, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/events"
        element={
          <Layout>
            <h4>Events</h4>
          </Layout>
        }
      />

      <Route
        path="/auth/login"
        element={
          user ? (
            <Navigate to={`/`} />
          ) : (
            <Layout>
              <Login />
            </Layout>
          )
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          user ? (
            <Navigate to={`/`} />
          ) : (
            <Layout>
              <ForgotPassword />
            </Layout>
          )
        }
      />
      <Route
        path="/auth/register"
        element={
          user ? (
            <Navigate to={`/`} />
          ) : (
            <Layout>
              <Register />
            </Layout>
          )
        }
      />
      <Route
        element={
          <Layout notfound>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
