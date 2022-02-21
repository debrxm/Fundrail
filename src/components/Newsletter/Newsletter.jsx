import React, { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Spacing from "../Spacing/Spacing";
import "./styles.scss";

const Newsletter = ({ text, icon }) => {
  const [email, setEmail] = useState("");
  const url =
    "https://oakonsult.us1.list-manage.com/subscribe/post?u=f514bac518d81829d3a86f8d8&amp;id=c138c64f47";
  return (
    <div className="newsletter">
      <div className="newsletter-text-content">
        <h2>Sign Up To Our Newsletter.</h2>
        <p>Be the first to hear about the latest offers</p>
      </div>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => {
          const onSubmit = (e) => {
            e.preventDefault();
            subscribe({ EMAIL: email });
            status === "success" && setEmail("");
          };
          return (
            <form onSubmit={onSubmit}>
              <div className="newsletter-input-group">
                <input
                  placeholder="Your Email"
                  onChange={({ target }) => setEmail(target.value)}
                />
                <Spacing width="1.5em" />
                <button className="newsletter-btn" onClick={onSubmit}>
                  Subscribe
                </button>
              </div>
              {status === "success" ? (
                <span className="success-subscribe">
                  Subscribed{" "}
                  <span role="img" aria-label="check">
                    ✔
                  </span>
                </span>
              ) : null}
            </form>
          );
        }}
      />
    </div>
  );
};
export default Newsletter;
