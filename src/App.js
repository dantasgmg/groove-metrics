import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home";

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        {/* Separar acesso das rodas baseado no code */}
        <Route path="/home" element={<Home code = {code}/>} />
      </Routes>
    </Router>
  );
}

export default App;