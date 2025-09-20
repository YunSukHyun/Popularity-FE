import styles from "./selected.module.css";
import Legend from "../legend/legend";
// import CharacterCard from "../characterCard/characterCard";
import { useSelect } from "../../context";
import { useCallback } from "react";
import CharacterCard from "../characterCard/characterCard";

const Selected = () => {
  // const unSelect = useCallback((e) => {
  //   const beUnSelected = e.target.alt;
  // }, []);

  const showSelected = useCallback(() => {}, []);
  const { selection } = useSelect();

  return (
    <section className={styles.selected}>
      <div className={styles.afterSelect}>나의 선택</div>
      <div className={styles.toServer}>
        <div className={styles.score3}>
          {selection[0] ? (
            <CharacterCard name={selection[0].name} url={selection[0].url} />
          ) : (
            ""
          )}
        </div>
        <div className={styles.score2}>
          {" "}
          {selection[1] ? (
            <CharacterCard name={selection[1].name} url={selection[1].url} />
          ) : (
            ""
          )}
        </div>
        <div className={styles.score1}>
          {" "}
          {selection[2] ? (
            <CharacterCard name={selection[2].name} url={selection[2].url} />
          ) : (
            ""
          )}
        </div>
      </div>
      <Legend />
      {/* {sessionStorage.getItem('user') &&
      <Submit game={game}/>} */}
    </section>
  );
};

export default Selected;
