import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Devices from "./features/devices/Devices";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/devices" element={<Devices />} />
      </Routes>
    </div>
  );
}

export default App;
