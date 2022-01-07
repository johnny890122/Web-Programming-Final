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

function App() {
  const ME_KEY = "me";

  return (
    <>
      <Routes>
        {/* login and signup */}

        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* user part */}
        <Route path="/user/Dashboard" element={<UserDashboard />} />
        <Route path="/user/Calendar" element={<UserEvent />} />
        <Route path="/user/CreateUserEvent" element={<CreateUserEvent me={localStorage.getItem(ME_KEY)} />} />
        <Route path="/user/Team" element={<UserTeam />} />
        <Route path="/user/Achievement" element={<UserAchievement me={localStorage.getItem(ME_KEY)} />} />

        {/* team part */}
        <Route path="/team/Create" element={<TeamCreate />} />
        <Route path="/team/:teamname/Home" element={<TeamHome />} />
        <Route path="/team/:teamname/Member" element={<TeamMember />} />
        <Route path="/team/:teamname/Calendar" element={<TeamEvent />} />
        <Route path="/team/CreateTeamEvent" element={<CreateTeamEvent />} />
        <Route path="/team/:teamname/Posts" element={<TeamPost />} />
        <Route path="/team/:teamname/Score" element={<TeamScore />} />
        <Route path="/team/:teamname/Vote" element={<TeamVote />} />
        <Route path="/team/:teamname/Gantt" element={<TeamGantt />} />
        <Route
          path="/team/:teamname/Score/:id/detail"
          element={<TeamScoreDetail />}
        />
        <Route path="/team/:teamname/Gallery" element={<TeamGallery />} />

        {/* 下面就照這個邏輯繼續加其他頁面 */}
      </Routes>
    </>
  );
}
export default App;
