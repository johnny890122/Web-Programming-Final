<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Header from "./containers/Header.js";
import NavBar from "./containers/NavBar.js";
import Body from "./containers/Body.js";
import ListUserTeam from './components/List';

function App() {
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
        </div>
      </section>
    </section>
  );
}
export default App;
