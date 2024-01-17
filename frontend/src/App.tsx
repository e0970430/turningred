import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/landing/Landing";
import Homepage from "./pages/homepage/Homepage";
import TransactionHistory from "./pages/transactionhistory/TransactionHistory";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./App.css";
import Transaction from './pages/Transaction';
import detectProvider from "@portkey/detect-provider";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import { useEffect, useState } from "react";

function App() {
  const auth = useAuth();
  const [provider, setProvider] = useState<IPortkeyProvider | null>(null);

  const init = async () => {
    try {
      setProvider(await detectProvider());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!provider) init();
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

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
            <Route path="/transactionforms" element={<Transaction provider={provider}/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
