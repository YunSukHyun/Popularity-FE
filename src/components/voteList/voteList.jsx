import styles from "./voteList.module.css"; // Import CSS module
import api from "../../service/axios";
import { timeLeft } from "../../service/timeCalc";
import { useEffect, useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [votes, setVotes] = useState([]);

  const fetchVotes = async (type) => {
    try {
      const response = await api.get(`/vote/list?type=${type}`);
      setVotes(response.data);
      setActiveTab(type);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  useEffect(() => {
    fetchVotes("ongoing");
  }, []);

  return (
    <>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${
            activeTab === "ongoing" ? styles.active : ""
          }`}
          onClick={() => fetchVotes("ongoing")}
        >
          <span role="img" aria-label="ongoing">
            🗳️
          </span>
          진행중
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "closed" ? styles.active : ""
          }`}
          onClick={() => fetchVotes("closed")}
        >
          <span role="img" aria-label="closed">
            🏆
          </span>
          투표결과
        </button>
      </div>
      <section className={styles.votes}>
        {votes.map(({ id, icon, title, endTime, participantCount }) => (
          <div key={id} className={styles.vote}>
            <div className={styles.imageContainer}>
              <img className={styles.voteImg} src={icon} alt="vote" />
              <div className={styles.overlay}>
                <p>{title}</p>
                <p>{`마감까지 ${timeLeft(endTime)}`}</p>
                <p>{participantCount}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Tabs;
