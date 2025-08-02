import styles from "./selected.module.css";
import Legend from "../legend/legend";
// import CharacterCard from "../characterCard/characterCard";
import { Link } from "react-router-dom";
import { useCallback } from "react";

const Selected = () => {
  // const unSelect = useCallback((e) => {
  //   const beUnSelected = e.target.alt;
  // }, []);

  const showSelected = useCallback(() => {}, []);

  return (
    <section className={styles.selected}>
      <div className={styles.afterSelect}>나의 선택</div>
      <div className={styles.toServer}>
        <div className={styles.score3}>{showSelected(1)}</div>
        <div className={styles.score2}>{showSelected(2)}</div>
        <div className={styles.score1}>{showSelected(3)}</div>
      </div>
      <Legend />
      {/* {sessionStorage.getItem('user') &&
      <Submit game={game}/>} */}
    </section>
  );
};

export default Selected;
