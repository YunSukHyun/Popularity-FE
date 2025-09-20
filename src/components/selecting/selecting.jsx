import styles from "./selecting.module.css";
import Character from "../character/character";
import SkeletonChar from "../skeletonChar/skeletonChar";
import { useSelect } from "../../context";

const Selecting = ({ voteInfo, loading }) => {
  const { selection } = useSelect();
  console.log(voteInfo);
  const isSelected = (name) => {
    for (const selected of selection) {
      if (selected.name === name) return true;
    }
    return false;
  };
  return (
    <section className={styles.unselected}>
      <div className={styles.beforeSelect}>캐릭터</div>
      <div className={styles.characters}>
        {loading
          ? Array.from({ length: 16 }).map((_, idx) => (
              <SkeletonChar key={idx} />
            ))
          : voteInfo.candidates.map(({ name, thumbnail }) =>
              isSelected(name) ? (
                ""
              ) : (
                <Character key={name} name={name} thumbnail={thumbnail} />
              )
            )}
      </div>
    </section>
  );
};
export default Selecting;
