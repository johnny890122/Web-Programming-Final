import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import UserDashboard from "./UserDashboard";
import UserAchievement from "./UserAchievement";
import UserTeam from "./UserTeam";
import UserEvent from "./UserEvent";
import TeamHome from "./TeamHome";
import TeamEvent from "./TeamEvent";
import TeamGantt from "./TeamGantt";
import TeamMember from "./TeamMember";
import TeamPost from "./TeamPost";
import TeamScore from "./TeamScore";
import TeamVote from "./TeamVote";
import TeamScoreDetail from "./TeamScoreDetail";
import TeamGallery from "./TeamGallery";
import TeamCreate from "./TeamCreate";
import CreateUserEvent from "./CreateUserEvent";
import CreateTeamEvent from "./CreateTeamEvent";
import UserSettings from "./UserSettings";
import About from "./About";

function App() {
  const ME_KEY = "me";
  const TEAM_KEY = "nowTeam";
  const CONTEST_KEY = "nowContest";

  return (
    <>
      <Routes>
        <Route path="/reload" element={null} key="reload" />
        {/* login and signup */}
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/user/Settings"
          element={<UserSettings me={localStorage.getItem(ME_KEY)} />}
        />

        {/* user part */}
        <Route
          path="/user/Dashboard"
          element={<UserDashboard me={localStorage.getItem(ME_KEY)} />}
        />
        <Route
          path="/user/Calendar"
          element={<UserEvent me={localStorage.getItem(ME_KEY)} />}
        />
        <Route
          path="/user/CreateUserEvent"
          element={<CreateUserEvent me={localStorage.getItem(ME_KEY)} />}
        />
        <Route
          path="/user/Team"
          element={<UserTeam me={localStorage.getItem(ME_KEY)} />}
        />
        <Route
          path="/user/Achievement"
          element={<UserAchievement me={localStorage.getItem(ME_KEY)} />}
        />

        <Route
          path="/About"
          element={<About me={localStorage.getItem(ME_KEY)} />}
        />

        {/* team part */}
        <Route
          path="/team/Create"
          element={<TeamCreate me={localStorage.getItem(ME_KEY)} />}
        />
        <Route
          path="/team/:teamname/Home"
          element={
            <TeamHome
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
            />
          }
        />
        <Route
          path="/team/:teamname/Member"
          element={
            <TeamMember
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
            />
          }
        />
        <Route
          path="/team/:teamname/Event"
          element={
            <TeamEvent
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
            />
          }
        />
        <Route
          path="/team/:teamname/Posts"
          element={
            <TeamPost
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
            />
          }
        />
        <Route
          path="/team/:teamname/Score"
          element={
            <TeamScore
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
            />
          }
        />
        <Route
          path="/team/:teamname/Vote"
          element={
            <TeamVote
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
            />
          }
        />
        {/* <Route
          path="/team/:teamname/Gantt"
          element={<TeamGantt me={localStorage.getItem(ME_KEY)} />}
        /> */}
        <Route
          path="/team/:teamname/Score/:id/detail"
          element={
            <TeamScoreDetail
              me={localStorage.getItem(ME_KEY)}
              nowTeam={localStorage.getItem(TEAM_KEY)}
              nowContest={localStorage.getItem(CONTEST_KEY)}
            />
          }
        />
        {/* <Route
          path="/team/:teamname/Gallery"
          element={<TeamGallery me={localStorage.getItem(ME_KEY)} />}
        /> */}

        {/* 下面就照這個邏輯繼續加其他頁面 */}
      </Routes>
    </>
  );
}
export default App;
