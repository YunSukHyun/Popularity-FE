import styles from "./voteDetail.module.css";
import api from "../../service/axios";
import Selecting from "../../components/selecting/selecting";
import Selected from "../../components/selected/selected";
import { SelectProvider } from "../../context/selectContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VoteDetail = () => {
  const { id } = useParams();
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [voteInfo, setVoteInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoteDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/vote/detail/${id}`);
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

  return (
    <section className={styles.main}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className={styles.container}>
        <SelectProvider>
          <Selecting voteInfo={voteInfo} loading={loading} />
          <Selected voteMethod={voteInfo.voteMethod} />
        </SelectProvider>
      </div>
    </section>
  );
};

export default VoteDetail;
