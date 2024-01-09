import { useAuth } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const { userAccount, connect, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    connect();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <div>
          <p className={styles.message}>Welcome, {userAccount}!</p>
          <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className={`${styles.button} ${styles.loginButton}`} onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
