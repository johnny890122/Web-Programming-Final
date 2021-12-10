<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";

import { useState } from "react";
import UserDashboard from "./containers/UserDashboard";
import LogIn from "./containers/LogIn";
=======
import './App.css';
import Calendar from './Components/Calendar';
import UserTeam from './Components/UserTeam';
import UserAchievement from './Components/UserAchievement';
import TeamHP from './Components/TeamHp';
import TeamPost from './Components/TeamPost';
import TeamScore from './Components/TeamScore';
import TeamVote from './Components/TeamVote';
>>>>>>> 0f88246... .

function App() {
  const [logined, setLogined] = useState(false);
  return (
<<<<<<< HEAD
    <section className="wrapper">
      {logined ? (
        <UserDashboard setLogined={setLogined} />
      ) : (
        <LogIn setLogined={setLogined} />
      )}
=======
    <section>
      <Calendar/>
      <UserTeam/>
      <UserAchievement/>
      <TeamHP/>
      <TeamPost/>
      <TeamScore/>
      <TeamVote/>
>>>>>>> 0f88246... .
    </section>
  );
}

export default App;
