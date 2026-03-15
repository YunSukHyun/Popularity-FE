import styles from "./vote.module.css";
import Icon from "../icon/icon";
import { timeLeft } from "../../service/timeCalc";
import { useNavigate } from "react-router-dom";

interface VoteProps {
  id: number;
  icon: string;
  title: string;
  endTime: string;
  participantCount: number;
}

const Vote = ({ id, icon, title, endTime, participantCount }: VoteProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.vote} onClick={() => navigate(`vote/${id}`)}>
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
