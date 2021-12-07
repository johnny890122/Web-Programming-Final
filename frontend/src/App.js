import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Header from "./containers/Header.js";
import NavBar from "./containers/NavBar.js";
import Body from "./containers/Body.js";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Body />
    </>
  );
}

export default App;
