import styles from "./character.module.css";
import CharacterCard from "../characterCard/characterCard";
import type { VoteMethod } from "../../types/vote";

interface CharacterProps {
  id: string;
  name: string;
  thumbnail: string;
  voteMethod: VoteMethod;
}

const Character = ({ id, thumbnail, name, voteMethod }: CharacterProps) => {
  return (
    <div className={styles.imgBox}>
      <CharacterCard
        voteMethod={voteMethod}
        id={id}
        name={name}
        url={thumbnail}
      />
      <div className={styles.decBox}>{name}</div>
    </div>
  );
};

export default Character;
