import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.links}>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
            Home
          </Link>
          <Link to="/login" className={location.pathname === '/login' ? styles.active : ''}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
