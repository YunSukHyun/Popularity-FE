import styles from "./submit.module.css";
import { db } from "../../service/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

export default function Submit({ game }) {
  const pCharSelected = useSelector((state) => state.priconne.pCharSelected);
  const gCharSelected = useSelector((state) => state.genshin.gCharSelected);

  const [sex, setSex] = useState("남자");
  const handleSubmit = useCallback(async () => {
    const user = sessionStorage.getItem("user");
    const charRef = await getDoc(doc(db, "users", user));
    const isVoted = charRef.data();
    let gm;
    if (game === "genshin") {
      if (isVoted.genshin) {
        alert("이미 원신에 투표하였습니다.");
        return;
      }
      if (gCharSelected.length !== 3) {
        alert("3명을 골라주세요");
        return;
      }
      if (window.confirm(`이대로 원신(성별:${sex})에 투표하시겠습니까?`)) {
        await setDoc(doc(db, "users", user), {
          genshin: true,
          priconne: isVoted.priconne,
        });
        alert("소중한 한표 감사합니다.");
      } else {
        return;
      }
      if (sex === "여자") {
        gm = "genshinF";
      } else {
        gm = "genshinM";
      }
      gCharSelected.forEach(async (char, idx) => {
        const tmp = await getDoc(doc(db, gm, char));
        const { total, first, second, third } = tmp.data();
        if (idx === 0) {
          await setDoc(doc(db, gm, char), {
            total: total + 3,
            first: first + 1,
            second: second,
            third: third,
          });
        } else if (idx === 1) {
          await setDoc(doc(db, gm, char), {
            total: total + 2,
            first: first,
            second: second + 1,
            third: third,
          });
        } else {
          await setDoc(doc(db, gm, char), {
            total: total + 1,
            first: first,
            second: second,
            third: third + 1,
          });
        }
      });
    } else {
      if (isVoted.priconne) {
        alert("이미 프리코네에 투표하였습니다.");
        return;
      }
      if (pCharSelected.length !== 6) {
        alert("6명을 골라주세요");
        return;
      }
      if (window.confirm(`이대로 프리코네에 투표하시겠습니까?`)) {
        await setDoc(doc(db, "users", user), {
          genshin: isVoted.genshin,
          priconne: true,
        });
        alert("소중한 한표 감사합니다.");
      } else {
        return;
      }
      gm = "priconne";
      pCharSelected.forEach(async (char, idx) => {
        const tmp = await getDoc(doc(db, gm, char));
        const { total, first, second, third } = tmp.data();
        if (idx === 0) {
          await setDoc(doc(db, gm, char), {
            total: total + 3,
            first: first + 1,
            second: second,
            third: third,
          });
        } else if (idx === 1 || idx === 2) {
          await setDoc(doc(db, gm, char), {
            total: total + 2,
            first: first,
            second: second + 1,
            third: third,
          });
        } else {
          await setDoc(doc(db, gm, char), {
            total: total + 1,
            first: first,
            second: second,
            third: third + 1,
          });
        }
      });
    }
  }, [gCharSelected, game, pCharSelected, sex]);

  return (
    <>
      <button className={styles.submit} onClick={handleSubmit}>
        submit
      </button>
      {game === "genshin" ? (
        <select value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
      ) : (
        ""
      )}
    </>
  );
}
