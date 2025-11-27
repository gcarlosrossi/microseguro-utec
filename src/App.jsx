
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { About } from "./components/about";
import { Features } from "./components/features";
import { Detail } from "./components/detail";
import { Footer} from "./components/footer";
import { Register } from "./components/register";
import { Login} from "./components/login";
import { Navigationsignin} from "./components/navigationsignin"
import { Panelcontrol } from "./components/panelcontrol";
import { Fastactions } from "./components/fastactions";
import SmoothScroll from "smooth-scroll";
import "./App.css";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <Routes>
      {/* Home / Landing */}
      <Route
        path="/"
        element={
          <div>
            <Navigation />
            <About />
            <Features/>
            <Detail />
            <Footer/>
          </div>
        }
      />

      {/* Pantalla de Cotización */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={
        <div>
          <Navigationsignin />
          <Panelcontrol />
          <Fastactions/>
          <Footer/>
        </div>
      } />
    </Routes>
  );
};

export default App;
