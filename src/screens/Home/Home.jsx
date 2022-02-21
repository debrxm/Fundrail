import React from "react";
import { Helmet } from "react-helmet";

import "./styles.scss";

const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>Fundrail</title>
        <meta property="og:title" content="Fundrail" />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta property="og:site_name" content="Fundrail" />
        <meta property="og:url" content="https://www.Fundrail.com" />
      </Helmet>
    </div>
  );
};

export default Home;
