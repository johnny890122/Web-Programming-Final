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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/user/Dashboard" element={<UserDashboard />} />
        <Route path="/user/Team" element={<Example />} />
        <Route path="/user/Achievement" element={<UserAchievement />} />
        {/* 下面就照這個邏輯繼續加其他頁面 */}
        <Route path="/team/Member" element={<TeamMember />} />
        <Route path="/team/Gantt" element={<TeamGantt />} />
      </Routes>
    </>
  );
}
export default App;
