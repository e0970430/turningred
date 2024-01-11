import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Transaction from './pages/Transaction';
import { AuthProvider } from "./contexts/AuthContext"; // Import the AuthProvider

function App() {
  return (
    <div>
      <AuthProvider> {/* Wrap your App with AuthProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
