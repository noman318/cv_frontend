import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedInPortal } from "./services/MyService";
import Loader from "./components/Loader";
const LoginScreen = lazy(() => import("./Screens/LoginScreen"));
const Footer = lazy(() => import("./components/Footer"));
const CreateResumeScreen = lazy(() => import("./Screens/CreateResumeScreen"));
const RegisterScreen = lazy(() => import("./Screens/RegisterScreen"));
const HomeScreen = lazy(() => import("./Screens/HomeScreen"));
const ViewResume = lazy(() => import("./Screens/ViewResume"));
const EditResumeScreen = lazy(() => import("./Screens/EditResumeScreen"));
const NotFoundScreen = lazy(() => import("./Screens/NotFoundScreen"));

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
          <Suspense fallback={<Loader />}>
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
              <Route
                path="/view/:id"
                element={
                  <ProtectRoute>
                    <ViewResume />
                  </ProtectRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectRoute>
                    <EditResumeScreen />
                  </ProtectRoute>
                }
              />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </Suspense>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
