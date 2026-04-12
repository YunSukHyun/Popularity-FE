import styles from "./characterCard.module.css";
import { SelectedCandidate, VoteMethod } from "../../types/vote";
import { Dispatch, SetStateAction } from "react";

interface CharacterCardProps {
  voteMethod?: VoteMethod;
  id?: string;
  url: string;
  name: string;
  selection: SelectedCandidate[];
  setSelection: Dispatch<SetStateAction<SelectedCandidate[]>>;
}

interface Character {
  id: string;
  name: string;
  url: string;
}

const CharacterCard = ({
  voteMethod,
  id,
  url,
  name,
  selection,
  setSelection,
}: CharacterCardProps) => {
  // const { selection, setSelection } = useSelect();
  const handleSelect = () => {
    if (!id || !voteMethod) return;
    console.log(voteMethod);
    if (voteMethod === "SELECT1") {
      if (!selection.some((char: Character) => char.name === name)) {
        if (selection.length > 0) return;
        setSelection((prev: Character[]) => [...prev, { id, name, url }]);
      } else {
        setSelection((prev: Character[]) =>
          prev.filter((char: Character) => char.name !== name),
        );
      }
    } else if (voteMethod === "SELECT3") {
      if (!selection.some((char: Character) => char.name === name)) {
        if (selection.length >= 3) return;
        setSelection((prev: Character[]) => [...prev, { id, name, url }]);
      } else {
        setSelection((prev: Character[]) =>
          prev.filter((char: Character) => char.name !== name),
        );
      }
    } else if (voteMethod === "SELECT6") {
      if (!selection.some((char: Character) => char.name === name)) {
        if (selection.length >= 6) return;
        setSelection((prev: Character[]) => [...prev, { id, name, url }]);
      } else {
        setSelection((prev: Character[]) =>
          prev.filter((char: Character) => char.name !== name),
        );
      }
    } else {
      console.log("method nothing");
    }
  };

  return (
    <img
      onClick={handleSelect}
      src={url}
      alt={`${name} image`}
      className={styles.unselected}
    />
  );
};

export default CharacterCard;
