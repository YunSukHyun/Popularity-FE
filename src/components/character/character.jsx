import styles from "./character.module.css";
import CharacterCard from "../characterCard/characterCard";
// import { useCallback, useState } from "react";

const Character = ({ thumbnail, name }) => {
  return (
    <div className={styles.imgBox}>
      <CharacterCard selected={false} name={name} url={thumbnail} />
      <div className={styles.decBox}>{name}</div>
    </div>
  );
};

export default Character;
