import { useNavigate } from "react-router-dom";
import styles from "./adminVote.module.css";
import { timeLeft } from "../../service/timeCalc";
import Icon from "../icon";

interface AdminVoteProps {
  id: number;
  title: string;
  endTime: string;
  participantCount: number;
  onDelete: (id: number) => void;
}

const AdminVote = ({
  id,
  title,
  endTime,
  participantCount,
  onDelete,
}: AdminVoteProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.vote} onClick={() => navigate(`/vote/${id}`)}>
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
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            console.log("edit clicked");
          }}
        >
          <Icon size={"16px"}>edit</Icon>
        </button>

        <button
          type="button"
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <Icon size={"16px"}>delete</Icon>
        </button>
      </div>
    </div>
  );
};
export default AdminVote;
