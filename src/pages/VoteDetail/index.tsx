import styles from "./voteDetail.module.css";
import api from "../../service/axios";
import Selecting from "../../components/selecting/selecting";
import Selected from "../../components/selected/selected";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SelectedCandidate, VoteInfo } from "../../types/vote";

const VoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [voteInfo, setVoteInfo] = useState<VoteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<SelectedCandidate[]>([]);

  useEffect(() => {
    const fetchVoteDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get<VoteInfo>(`/vote/detail/${id}`);
        const { data } = response;
        setBackgroundUrl(data.background);

        const preloadImages = data.candidates.map(({ thumbnail }) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = thumbnail;
            img.onload = resolve;
            img.onerror = resolve;
          });
        });
        await Promise.all(preloadImages);
        setVoteInfo(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoteDetail();
  }, [id]);

  if (!id) {
    return <div>Invalid vote ID</div>;
  }

  return (
    <section className={styles.main}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className={styles.container}>
        <Selecting
          voteInfo={voteInfo}
          loading={loading}
          selection={selection}
          setSelection={setSelection}
        />
        {voteInfo && (
          <Selected
            voteId={id}
            voteMethod={voteInfo.voteMethod}
            selection={selection}
            setSelection={setSelection}
          />
        )}
      </div>
    </section>
  );
};

export default VoteDetail;
