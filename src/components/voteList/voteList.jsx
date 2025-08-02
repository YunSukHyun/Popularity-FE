import styles from "./voteList.module.css";
import api from "../../service/axios";
import Vote from "../vote/vote";
import SkeletonVote from "../skeletonVote/skeletonVote";
import { useEffect, useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVotes = async (type) => {
    setLoading(true);
    try {
      const response = await api.get(`/vote/list?type=${type}`);
      const { data } = response;

      const preloadImages = data.map(({ icon }) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = icon;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(preloadImages);
      setVotes(data);
    } catch (error) {
      console.error("Error fetching votes:", error);
    } finally {
      setActiveTab(type);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes("ongoing");
  }, []);

  return (
    <div className={styles.voteList}>
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
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonVote key={index} />
            ))
          : votes.map(({ id, icon, title, endTime, participantCount }) => (
              <Vote
                key={id}
                id={id}
                icon={icon}
                title={title}
                endTime={endTime}
                participantCount={participantCount}
              />
            ))}
      </section>
    </div>
  );
};

export default Tabs;
