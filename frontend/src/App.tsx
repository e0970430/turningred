import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Transaction from './pages/Transaction';
import { AuthProvider } from "./contexts/AuthContext"; // Import the AuthProvider

function App() {
  const auth = useAuth();

  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                auth.isAuthenticated ? <Navigate to="/home" /> : <Landing />
              }
            />
            <Route
              path="/login"
              element={
                auth.isAuthenticated ? <Navigate to="/home" /> : <Login />
              }
            />
            <Route
              path="/home"
              element={
                auth.isAuthenticated ? <Homepage /> : <Navigate to="/" />
              }
            />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
