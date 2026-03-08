import styles from "./characterCard.module.css";
import { useSelect } from "../../context";

const CharacterCard = ({ voteMethod, id, url, name }) => {
  const { selection, setSelection } = useSelect();
  const handleSelect = () => {
    console.log(voteMethod);
    if (voteMethod === "SELECT1") {
      if (!selection.some((char) => char.name === name)) {
        if (selection.length > 0) return;
        setSelection((prev) => [...prev, { id, name, url }]);
      } else {
        setSelection((prev) => prev.filter((char) => char.name !== name));
      }
    } else if (voteMethod === "SELECT2") {
      if (!selection.some((char) => char.name === name)) {
        if (selection.length > 1) return;
        setSelection((prev) => [...prev, { id, name, url }]);
      } else {
        setSelection((prev) => prev.filter((char) => char.name !== name));
      }
    } else if (voteMethod === "SELECT3") {
      if (!selection.some((char) => char.name === name)) {
        if (selection.length > 2) return;
        setSelection((prev) => [...prev, { id, name, url }]);
      } else {
        setSelection((prev) => prev.filter((char) => char.name !== name));
      }
    } else {
      console.log("method nothing");
    }
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
