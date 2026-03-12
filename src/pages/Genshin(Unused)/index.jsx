import styles from "./game.module.css";
import Selected from "../../components/selected/selected";
import Footer from "../../components/footer(Unused)/footer";
import Selecting from "../../components/selecting/selecting";

const Genshin = () => {
  return (
    <section className={styles.main}>
      <div className={styles.gContainer}>
        <Selecting game="genshin" />
        <Selected game="genshin" />
      </div>
      <Footer />
    </section>
  );
};

export default Genshin;
