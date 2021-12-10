import React from "react";
import Header from "../components/Header.js";
import Body from "../components/Body.js";

const LogIn = ({ setLogined }) => {
  return (
    <section className="wrapper">
      <section className="header-container">
        <Header />
      </section>
      <section className="page-container">
        <div className="body-container">
          <Body />
          <button onClick={() => setLogined(true)}>Test Login/Logout</button>
        </div>
      </section>
    </section>
  );
};

export default LogIn;
