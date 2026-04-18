import styles from "./voteList.module.css";
import api from "../../service/axios";
import Vote from "../vote";
import SkeletonVote from "../skeletonVote";
import { useEffect, useState } from "react";

type VoteTab = "ongoing" | "closed";

interface VoteItem {
  id: number;
  iconUrl: string;
  title: string;
  endTime: string;
  participantCount: number;
}

const VoteList = () => {
  const [activeTab, setActiveTab] = useState<VoteTab>("ongoing");
  const [votes, setVotes] = useState<VoteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVotes = async (type: VoteTab) => {
    setLoading(true);
    try {
      const response = await api.get<VoteItem[]>(`/vote/list?type=${type}`);
      const { data } = response;

      const preloadImages = data.map(({ iconUrl }) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = iconUrl;
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
          : votes.map(({ id, iconUrl, title, endTime, participantCount }) => (
              <Vote
                key={id}
                id={id}
                iconUrl={iconUrl}
                title={title}
                endTime={endTime}
                participantCount={participantCount}
              />
            ))}
      </section>
    </div>
  );
};

export default VoteList;
