import styles from "./vote.module.css";
import Icon from "../icon/icon";
import { timeLeft } from "../../service/timeCalc";

const Vote = ({ icon, title, endTime, participantCount }) => {
  return (
    <div className={styles.vote}>
      <div className={styles.imageContainer}>
        <img className={styles.voteImg} src={icon} alt="vote" />
        <div className={styles.overlay}>
          <div className={styles.title}>
            <p>{title}</p>
          </div>
          <div className={styles.deadLine}>
            <p>{timeLeft(endTime)}</p>
          </div>
          <div className={styles.participantCount}>
            <Icon size={"16px"} color={"white"}>
              people
            </Icon>
            <p>{participantCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
