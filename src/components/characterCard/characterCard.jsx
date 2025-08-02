import styles from "./characterCard.module.css";

// const CharacterCard = ({ selected, char, game, callback }) => {
const CharacterCard = ({ selected, url, name }) => {
  return <img src={url} alt={`${name} 이미지`} className={styles.unselected} />;
};

export default CharacterCard;
