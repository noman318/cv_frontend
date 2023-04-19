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
import Footer from "./components/Footer";
import CreateResumeScreen from "./Screens/CreateResumeScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            // pauseOnFocusLoss
            draggable
            // pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/add-resume" element={<CreateResumeScreen />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
