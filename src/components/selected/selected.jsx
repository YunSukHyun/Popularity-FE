import styles from "./selected.module.css";
import { useSelect } from "../../context";
import CharacterCard from "../characterCard/characterCard";

const Selected = ({ voteId, voteMethod }) => {
  const { selection } = useSelect();
  // const { user } = useAuth();
  const handleSubmit = async () => {
    const formData = {
      voteId,
      candidateIds: selection.map((candidate) => candidate.id),
    };
    // const reponse = await api.post(`/vote/submit`, formData);
    console.log(selection, formData);
  };

  return (
    <section className={styles.selected}>
      <div className={styles.afterSelect}>나의 선택</div>
      <div className={styles.toServer}>
        <div className={styles.score3}>
          {selection[0] ? (
            <CharacterCard
              voteMethod={voteMethod}
              name={selection[0].name}
              url={selection[0].url}
            />
          ) : (
            ""
          )}
        </div>
        <div className={styles.score2}>
          {selection[1] ? (
            <CharacterCard
              voteMethod={voteMethod}
              name={selection[1].name}
              url={selection[1].url}
            />
          ) : (
            ""
          )}
        </div>
        <div className={styles.score1}>
          {selection[2] ? (
            <CharacterCard
              voteMethod={voteMethod}
              name={selection[2].name}
              url={selection[2].url}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <button onClick={handleSubmit}>제출</button>
    </section>
  );
};

export default Selected;
