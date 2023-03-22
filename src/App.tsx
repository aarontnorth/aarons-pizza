import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        background: {
            default: "#3174a7"
        },
        text: {
            primary: "#ffffff"
        }
    },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
