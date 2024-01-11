import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/landing/Landing";
import Homepage from "./pages/homepage/Homepage";
import TransactionHistory from "./pages/transactionhistory/TransactionHistory";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./App.css";
import Transaction from './pages/Transaction';

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
              path="/home"
              element={
                auth.isAuthenticated ? <Homepage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/transactionhistory"
              element={
                auth.isAuthenticated ? <TransactionHistory /> : <TransactionHistory />
              }
            />
            console.log(auth.isAuthenticated);
            <Route path="/transactionforms" element={<Transaction />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
