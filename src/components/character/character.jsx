import styles from "./character.module.css";
import CharacterCard from "../characterCard/characterCard";
// import { useCallback, useState } from "react";

const Character = ({ thumbnail, name, voteMethod }) => {
  return (
    <div className={styles.imgBox}>
      <CharacterCard voteMethod={voteMethod} name={name} url={thumbnail} />
      <div className={styles.decBox}>{name}</div>
    </div>
  );
};

export default Character;
