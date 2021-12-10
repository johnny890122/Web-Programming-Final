import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import TeamNavBar from "../components/TeamNavBar";
import Body from "../components/Body";

const UserDashboard = ({ setLogined }) => {
  return (
    <section className="wrapper">
      <section className="header-container">
        <Header />
      </section>
      <section className="page-container">
        <div className="navbar-container" style={{ position: "relative" }}>
          <NavBar />
        </div>
        <div className="teamNavbar-container" style={{ position: "relative" }}>
          <TeamNavBar />
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
