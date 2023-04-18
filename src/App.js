import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen";
import Navbar from "./components/Navbar";
import LoginScreen from "./Screens/LoginScreen";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./Screens/HomeScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
