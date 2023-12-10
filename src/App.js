import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./Layouts/TopNav";

import Galery from "./Pages/Galery";
import Form from "./Pages/Form";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <TopNav />
      <Routes>
        <Route path="/" element={<Galery />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
