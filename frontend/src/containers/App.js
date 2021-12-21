import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Example from "./Example";
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

function App() {
  return (
    <>
      <Routes>
        {/* login and signup */}
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* user part */}
        <Route path="/user/Dashboard" element={<UserDashboard />} />
        <Route path="/user/Calendar" element={<UserEvent />} />
        <Route path="/user/Team" element={<UserTeam />} />
        <Route path="/user/Achievement" element={<UserAchievement />} />

        {/* team part */}
        <Route path="/team/2/Home" element={<TeamHome />} />
        <Route path="/team/Member" element={<TeamMember />} />
        <Route path="/team/Calendar" element={<TeamEvent />} />
        <Route path="/team/Posts" element={<TeamPost />} />
        <Route path="/team/Score" element={<TeamScore />} />
        <Route path="/team/Vote" element={<TeamVote />} />
        <Route path="/team/Gantt" element={<TeamGantt />} />
        <Route path="/team/Score/4/detail" element={<TeamScoreDetail />} />
        {/* 下面就照這個邏輯繼續加其他頁面 */}
      </Routes>
    </>
  );
}
export default App;
