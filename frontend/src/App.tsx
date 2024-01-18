import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { IPortkeyProvider } from "@portkey/provider-types";
import { useEffect, useState } from "react";
import detectProvider from "@portkey/detect-provider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/landing/Landing";
import Homepage from "./pages/homepage/Homepage";
import TransactionHistory from "./pages/transactionhistory/TransactionHistory";
import Transaction from './pages/Transaction';

import "./App.css";


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

  if (!provider) return <>Loading...</>;

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
                auth.isAuthenticated ? <TransactionHistory provider={provider} /> : <Navigate to="/" />
              }
            />

            <Route path="/transactionforms" element={<Transaction provider={provider}/>} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
