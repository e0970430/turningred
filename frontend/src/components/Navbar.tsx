import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [navbarAtTop, setNavbarAtTop] = useState(true); // Track if the navbar is at the top
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolledUp =
        prevScrollY.current > currentScrollY || currentScrollY < 1;
      setIsNavbarVisible(isScrolledUp);
      setNavbarAtTop(currentScrollY < 1); // Check if the navbar is at the top
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  return (
    <nav
      className={`${styles.navbar} ${
        isNavbarVisible ? "" : styles.navbarHidden
      } ${styles.navbarContainer}`}
      style={{
        backgroundColor: navbarAtTop ? "transparent" : "#7b3636",
        color: navbarAtTop ? "#7b3636" : "#fff",
      }}
    >

      <div className={`${styles.menuIconContainer}`}>
        <div className={styles.menuIcon} onClick={toggleNavbar}>
          {isNavbarOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} style={{ width: '100px' }} />
        </Link>
      </div>
        <ul
          className={`${styles.navMenu} ${isNavbarOpen ? styles.active : ""}`}
        >

          {isNavbarOpen && (
            <div className={styles.closeButton} onClick={toggleNavbar}>
              <FaTimes />
            </div>
          )}
          <li className={styles.navItem}>
          <Link
            to="/"
            onClick={() => handleNavOptionClick("about")}
            className={isNavbarOpen ? styles.navMenuLink : ""}
            style={{
                fontWeight: "bold",
                color: isNavbarOpen ? "#fff" : navbarAtTop ? "#7b3636" : "#fff",
            }}
            >
            About Us
            </Link>
            <Link
            to="/login"
            className={isNavbarOpen ? styles.navMenuLink : ""}
            style={{
                fontWeight: "bold",
                color: isNavbarOpen ? "#fff" : navbarAtTop ? "#7b3636" : "#fff",
                marginLeft: "20px",
            }}
            >
            Login
            </Link>
            <Link
            to="/transaction"
            className={isNavbarOpen ? styles.navMenuLink : ""}
            style={{
                fontWeight: "bold",
                color: isNavbarOpen ? "#fff" : navbarAtTop ? "#7b3636" : "#fff",
                marginLeft: "20px",
            }}
            >
            New Transaction
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
