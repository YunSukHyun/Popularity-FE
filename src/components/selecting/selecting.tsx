import styles from "./selecting.module.css";
import Character from "../character/character";
import SkeletonChar from "../skeletonChar/skeletonChar";
import type { SelectedCandidate, VoteInfo } from "../../types/vote";
import { Dispatch, SetStateAction } from "react";

interface SelectingProps {
  voteInfo: VoteInfo | null;
  loading: boolean;
  selection: SelectedCandidate[];
  setSelection: Dispatch<SetStateAction<SelectedCandidate[]>>;
}

const Selecting = ({
  voteInfo,
  loading,
  selection,
  setSelection,
}: SelectingProps) => {
  const isSelected = (name: string) => {
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
          : voteInfo?.candidates.map(({ id, name, thumbnail }) =>
              isSelected(name) ? (
                ""
              ) : (
                <Character
                  id={id}
                  key={name}
                  name={name}
                  thumbnail={thumbnail}
                  voteMethod={voteInfo.voteMethod}
                  selection={selection}
                  setSelection={setSelection}
                />
              ),
            )}
      </div>
    </section>
  );
};
export default Selecting;
