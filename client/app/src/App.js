import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import Register from "./routes/User/Register";
import Login from "./routes/User/Login";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
