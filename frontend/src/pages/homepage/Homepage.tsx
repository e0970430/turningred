import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import BoxesGif from "./boxes.gif";

function Homepage() {
  const { userAccount } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={BoxesGif} alt="Boxes GIF" className={styles.image} />
      </div>
      <div className={styles.messageContainer}>
        {userAccount ? (
          <>
            <p className={styles.welcomeMessage}>Welcome, {String(userAccount)}!</p>
            <Link to="/transactionforms" className={styles.buttonLink}>
              <button className={styles.button}>Get started!</button>
            </Link>
          </>
        ) : (
          <p className={styles.loggedMessage}>Loading!</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
