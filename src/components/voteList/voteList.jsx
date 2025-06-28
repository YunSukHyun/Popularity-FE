import styles from "./voteList.module.css";
import api from "../../service/axios";
import Vote from "../vote/vote";
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
    // fetchVotes("closed");
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
          <Vote
            key={id}
            icon={icon}
            title={title}
            endTime={endTime}
            participantCount={participantCount}
          />
        ))}
      </section>
    </>
  );
};

export default Tabs;
