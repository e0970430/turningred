import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

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
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
