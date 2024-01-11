import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { userAccount, isAuthenticated, logout, connect } = useAuth();
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) {
      setIsNavbarOpen(false);
    }
  };

  const handleNavOptionClick = (targetId) => {
    smoothScrollTo(targetId);
    setIsNavbarOpen(false);
  };

  const handleNavOptionClickNormal = (targetId) => {
    Navigate(targetId);
    setIsNavbarOpen(false);
  };

  const handleLogout = () => {
    console.log(userAccount);
    logout();
    window.location.reload(); 
    console.log("Logged out");
  };
  
  const handleLogin = async () => {
    await connect();
    window.location.reload(); 
    console.log("Logged in");
  };  

  return (
    <nav className={`${styles.navbar} ${styles.navbarContainer}`}>
      <div className={`${styles.menuIconContainer}`}>
        <div className={styles.menuIcon} onClick={toggleNavbar}>
          {isNavbarOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className={styles.logo}
              style={{ width: "100px" }}
            />
          </Link>
        </div>
        <ul className={`${styles.navMenu} ${isNavbarOpen ? styles.active : ""}`}>
          {isNavbarOpen && (
            <div className={styles.closeButton} onClick={toggleNavbar}>
              <FaTimes />
            </div>
          )}
          <li className={styles.navItem}>
            {!isAuthenticated && (
                <Link
                  to="/"
                  onClick={() => handleNavOptionClick("about")}
                  className={isNavbarOpen ? styles.navMenuLink : ""}
                  style={{
                    fontWeight: "bold",
                    marginLeft: "20px",
                  }}
                >
                  About Us
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/transactionhistory"
                  onClick={() => handleNavOptionClickNormal("transactionhistory")}
                  className={isNavbarOpen ? styles.navMenuLink : ""}
                  style={{
                    fontWeight: "bold",
                    marginLeft: "20px",
                  }}
                >
                  Transaction History
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/transactionforms"
                  onClick={() => handleNavOptionClickNormal("transactionforms")}
                  className={isNavbarOpen ? styles.navMenuLink : ""}
                  style={{
                    fontWeight: "bold",
                    marginLeft: "20px",
                  }}
                >
                  Transaction Forms
                </Link>
              )}
            {isAuthenticated ? (
              <button
                className={`${styles.navMenuButton} ${styles.logoutButton}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className={`${styles.navMenuButton} ${styles.loginButton}`}
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
