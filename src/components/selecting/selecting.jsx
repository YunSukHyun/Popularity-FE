import styles from "./selecting.module.css";
import { useSelect } from "../../context";
import Character from "../character/character";
import SkeletonChar from "../skeletonChar/skeletonChar";

const Selecting = ({ voteInfo, loading }) => {
  const { selection } = useSelect();
  const isSelected = (name) => {
    for (const selected of selection) {
      if (selected.name === name) return true;
    }
    return false;
  };
  return (
    <section className={styles.unselected}>
      <div className={styles.beforeSelect}>후보군</div>
      <div className={styles.characters}>
        {loading
          ? Array.from({ length: 16 }).map((_, idx) => (
              <SkeletonChar key={idx} />
            ))
          : voteInfo.candidates.map(({ id, name, thumbnail }) =>
              isSelected(name) ? (
                ""
              ) : (
                <Character
                  id={id}
                  key={name}
                  name={name}
                  thumbnail={thumbnail}
                  voteMethod={voteInfo.voteMethod}
                />
              )
            )}
      </div>
    </section>
  );
};
export default Selecting;
