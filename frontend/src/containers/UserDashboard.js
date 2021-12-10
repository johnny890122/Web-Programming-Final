import React from "react";
import Header from "./Header.js";
import NavBar from "./NavBar.js";
import Body from "./Body.js";

const UserDashboard = ({ setLogined }) => {
  return (
    <section className="wrapper">
      <section className="header-container">
        <Header />
      </section>
      <section className="page-container">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="body-container">
          <Body />
          <button onClick={() => setLogined(false)}>Test Login/Logout</button>
        </div>
      </section>
    </section>
  );
};

export default UserDashboard;
