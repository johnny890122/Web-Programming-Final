import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Header from "./containers/Header.js";
import NavBar from "./containers/NavBar.js";
import Body from "./containers/Body.js";
import Gantt from "./components/Gantt";
import BasicTable from "./components/Table";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Body />
      <Gantt />
      <BasicTable />
    </>
  );
}

export default App;
