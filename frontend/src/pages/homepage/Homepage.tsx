import { useAuth } from "../../contexts/AuthContext"; 
import styles from "./Homepage.module.css";

function Homepage() {
  const { userAccount } = useAuth();

  return (
    <div className={styles.container}>
      {userAccount ? (
        <p className={styles.welcomeMessage}>Welcome, {userAccount}!</p>
      ) : (
        <p className={styles.loggedMessage}>Loading!</p>
      )}
    </div>
  );
}

export default Homepage;
