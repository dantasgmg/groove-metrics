import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Insights from "./Pages/Insights";
import MatchPlaylists from "./Pages/MatchPlaylists";

const theme = createTheme({
  palette: {
    primary: green,
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/match_playlists" element={<MatchPlaylists />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;