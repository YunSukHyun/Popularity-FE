import styles from "./characterCard.module.css";
import { useSelect } from "../../context";

const CharacterCard = ({ voteMethod, url, name }) => {
  const { selection, setSelection } = useSelect();
  const handleSelect = () => {
    console.log(voteMethod);
    if (voteMethod === "SELECT1") {
      if (!selection.some((char) => char.name === name)) {
        if (selection.length > 0) return;
        setSelection((prev) => [...prev, { name, url }]);
        console.log("add");
      } else {
        console.log("delete");
        setSelection((prev) => prev.filter((char) => char.name !== name));
      }
      console.log("nothing");
    } else if (voteMethod === "SELECT2") {
      if (!selection.some((char) => char.name === name)) {
        if (selection.length > 1) return;
        setSelection((prev) => [...prev, { name, url }]);
      } else {
        setSelection((prev) => prev.filter((char) => char.name !== name));
      }
    } else if (voteMethod === "SELECT3") {
      if (!selection.some((char) => char.name === name)) {
        if (selection.length > 2) return;
        setSelection((prev) => [...prev, { name, url }]);
      } else {
        setSelection((prev) => prev.filter((char) => char.name !== name));
      }
    } else {
      console.log("method nothing");
    }
  };

  const handleUnselect = (e) => {
    console.log(e.target);
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
