import styles from "./characterCard.module.css";
import { useSelect } from "../../context";

const CharacterCard = ({ selected, url, name }) => {
  const { selection, setSelection } = useSelect();
  const handleSelect = () => {
    setSelection(() => [...selection, { name, url }]);
    console.log(selection);
  };

  return (
    <img
      onClick={handleSelect}
      src={url}
      alt={`${name} 이미지`}
      className={styles.unselected}
    />
  );
};

export default CharacterCard;
