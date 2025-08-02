import styles from "./selecting.module.css";
import Character from "../character/character";
import SkeletonChar from "../skeletonChar/skeletonChar";

const Selecting = ({ voteInfo, loading }) => {
  return (
    <section className={styles.unselected}>
      <div className={styles.beforeSelect}>캐릭터</div>
      <div className={styles.characters}>
        {loading
          ? Array.from({ length: 16 }).map((_, idx) => (
              <SkeletonChar key={idx} />
            ))
          : voteInfo.candidates.map(({ name, thumbnail }) => (
              <Character key={name} name={name} thumbnail={thumbnail} />
            ))}
      </div>
    </section>
  );
};
export default Selecting;
