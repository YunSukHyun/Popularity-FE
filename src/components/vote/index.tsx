import styles from "./vote.module.css";
import Icon from "../icon";
import { timeLeft } from "../../service/timeCalc";
import { useNavigate } from "react-router-dom";

interface VoteProps {
  id: number;
  iconUrl: string;
  title: string;
  endTime: string;
  participantCount: number;
}

const Vote = ({ id, iconUrl, title, endTime, participantCount }: VoteProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const isClosed = new Date(endTime).getTime() <= Date.now();
    if (isClosed) navigate(`/vote/result/${id}`);
    else navigate(`/vote/ongoing/${id}`);
  };

  return (
    <div className={styles.vote} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img className={styles.voteImg} src={iconUrl} alt="vote" />
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
