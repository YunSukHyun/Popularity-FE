import styles from "./characters.module.css";
import Character from "../character/character";
import * as gLib from "../../library/genshin_library";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const GCharacters = ({ game }) => {
  const male = gLib.gender[0];
  const female = gLib.gender[1];
  const [charState, setCharState] = useState([true, true]);
  const gCharSelected = useSelector((state) => state.genshin.gCharSelected);

  const handleCharList = useCallback((e) => {
    e.preventDefault();
    const ClickedBtn = e.target.value;
    switch (ClickedBtn) {
      case "남자":
        setCharState([true, false]);
        break;
      case "여자":
        setCharState([false, true]);
        break;
      default:
        setCharState([true, true, true]);
    }
  }, []);

  return (
    <>
      <span className={styles.classify}>분류: </span>
      {gLib.genderBtn.map((gender) => (
        <input
          key={gender}
          className={styles.button}
          onClick={handleCharList}
          type="button"
          value={gender}
        />
      ))}
      <div className={styles.charPadding}>
        {charState[0] && (
          <span>
            {male.map((character) =>
              gCharSelected.includes(character) ? (
                ""
              ) : (
                <Character game={game} char={character} key={character} />
              )
            )}
          </span>
        )}
        {charState[1] && (
          <span>
            {female.map((character) =>
              gCharSelected.includes(character) ? (
                ""
              ) : (
                <Character game={game} char={character} key={character} />
              )
            )}
          </span>
        )}
      </div>
    </>
  );
};

export default GCharacters;
