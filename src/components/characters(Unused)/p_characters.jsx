import styles from "./characters.module.css";
import Character from "../character/character";
import * as pLib from "../../library/priconne_library";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const PCharacters = ({ game }) => {
  const star1 = pLib.characters[0];
  const star2 = pLib.characters[1];
  const star3 = pLib.characters[2];
  const [charState, setCharState] = useState([true, true, true]);
  const pCharSelected = useSelector((state) => state.priconne.pCharSelected);

  const handleCharList = useCallback((e) => {
    e.preventDefault();
    const ClickedBtn = e.target.value;
    switch (ClickedBtn) {
      case "★1":
        setCharState([true, false, false]);
        break;
      case "★2":
        setCharState([false, true, false]);
        break;
      case "★3":
        setCharState([false, false, true]);
        break;
      default:
        setCharState([true, true, true]);
    }
  }, []);

  return (
    <>
      <span className={styles.classify}>분류: </span>
      {pLib.starsBtn.map((star) => (
        <input
          key={star}
          className={styles.button}
          onClick={handleCharList}
          type="button"
          value={star}
        />
      ))}
      <div className={styles.charPadding}>
        {charState[0] && (
          <span>
            {star1.map((character) =>
              pCharSelected.includes(character) ? (
                ""
              ) : (
                <Character game={game} char={character} key={character} />
              )
            )}
          </span>
        )}
        {charState[1] && (
          <span>
            {star2.map((character) =>
              pCharSelected.includes(character) ? (
                ""
              ) : (
                <Character game={game} char={character} key={character} />
              )
            )}
          </span>
        )}
        {charState[2] && (
          <span>
            {star3.map((character) =>
              pCharSelected.includes(character) ? (
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

export default PCharacters;
