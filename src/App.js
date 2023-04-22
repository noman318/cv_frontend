import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen";
import Navbar from "./components/Navbar";
import LoginScreen from "./Screens/LoginScreen";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./Screens/HomeScreen";
import Footer from "./components/Footer";
import CreateResumeScreen from "./Screens/CreateResumeScreen";
import { isLoggedInPortal } from "./services/MyService";
import ViewResume from "./Screens/ViewResume";
import { Document, Page, Text } from "@react-pdf/renderer";

function App() {
  const ProtectRoute = ({ children }) => {
    const auth = isLoggedInPortal();
    return auth ? children : <Navigate to="/register" />;
  };
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
            draggable
            theme="dark"
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <HomeScreen />
                </ProtectRoute>
              }
            />
            <Route
              path="/add-resume"
              element={
                <ProtectRoute>
                  <CreateResumeScreen />
                </ProtectRoute>
              }
            />
            <Route path="/view/:id" element={<ViewResume />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
