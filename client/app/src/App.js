import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import Register from "./routes/User/Register";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
