import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Example from "./Example";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import UserDashboard from "./UserDashboard";
import UserAchievement from "./UserAchievement";
import TeamGantt from "./TeamGantt";
import TeamMember from "./TeamMember";
import TeamScore from "./TeamScore";
import Gallery from "../components/Gallery"

function App() {
  return (
    <>
      <Routes>
        {/* login and signup */}
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* user part */}
        <Route path="/user/Dashboard" element={<UserDashboard />} />
        <Route path="/user/Team" element={<Example />} />
        <Route path="/user/Achievement" element={<UserAchievement />} />

        {/* team part */}
        <Route path="/team/Member" element={<TeamMember />} />
        <Route path="/team/Score" element={<TeamScore />} />
        <Route path="/team/Gantt" element={<TeamGantt />} />
        <Route path="/team/Gallery" element={<Gallery />} />
        {/* 下面就照這個邏輯繼續加其他頁面 */}
      </Routes>
    </>
  );
}
export default App;
