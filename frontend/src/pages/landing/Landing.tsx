import WarehouseBackground from "./WarehouseBackground.gif";
import styles from "./Landing.module.css";

function Homepage() {
  return (
        <section
          id="home"
          className={`${styles["animation"]} ${styles["landingSection"]}`}
        >
          <div
            className={styles["landingBackground"]}
            style={{ backgroundImage: `url(${WarehouseBackground})` }}
          ></div>
          <div className={styles["landingText"]}>
            <h1>Welcome to TurningRed!</h1>
            <p>The Next Supply Chain Revolution</p>
          </div>
        </section>
  );
}

export default Homepage;
