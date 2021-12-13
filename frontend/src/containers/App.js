import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Example from "./Example";
import UserDashboard from "./UserDashboard";
import UserAchievement from "./UserAchievement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Dashboard" element={<UserDashboard />} />
        <Route path="/Team" element={<Example />} />
        <Route path="/Achievement" element={<UserAchievement />} />
        {/* 下面就照這個邏輯繼續加其他頁面 */}
      </Routes>
    </>
  );
}
export default App;
