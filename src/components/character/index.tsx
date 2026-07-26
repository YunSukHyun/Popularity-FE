import styles from "./character.module.css";
import CharacterCard from "../characterCard";
import type { SelectedCandidate, VoteMethod } from "../../types/vote";
import { Dispatch, SetStateAction } from "react";

interface CharacterProps {
  id?: string;
  name: string;
  thumbnailUrl: string;
  voteMethod?: VoteMethod;
  selection?: SelectedCandidate[];
  setSelection?: Dispatch<SetStateAction<SelectedCandidate[]>>;
}

const Character = ({
  id,
  thumbnailUrl,
  name,
  voteMethod,
  selection,
  setSelection,
}: CharacterProps) => {
  return (
    <div className={styles.imgBox}>
      <CharacterCard
        voteMethod={voteMethod}
        id={id}
        name={name}
        url={thumbnailUrl}
        selection={selection}
        setSelection={setSelection}
      />
      <div className={styles.decBox}>{name}</div>
    </div>
  );
};

export default Character;
