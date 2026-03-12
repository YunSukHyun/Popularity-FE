import styles from "./game.module.css";
import Footer from "../../components/footer(Unused)/footer";
import Selected from "../../components/selected/selected";
import Selecting from "../../components/selecting/selecting";

const Priconne = () => {
  return (
    <section className={styles.main}>
      <div className={styles.pContainer}>
        <Selecting game="priconne" />
        <Selected game="priconne" />
      </div>
      <Footer />
    </section>
  );
};

export default Priconne;
