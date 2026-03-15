import styles from "./selected.module.css";
import { useSelect } from "../../context";
import CharacterCard from "../characterCard/characterCard";
import { VoteMethod } from "../../types/vote";

interface SelectedProps {
  voteId: string;
  voteMethod: VoteMethod;
}

const scoreGroups = [
  { className: styles.score3, range: [0, 1] },
  { className: styles.score2, range: [1, 3] },
  { className: styles.score1, range: [3, 6] },
];

const Selected = ({ voteId, voteMethod }: SelectedProps) => {
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
        {scoreGroups.map(({ className, range }) => (
          <div className={className} key={className}>
            {selection.slice(range[0], range[1]).map((char) => (
              <CharacterCard
                key={char.id}
                id={char.id}
                voteMethod={voteMethod}
                name={char.name}
                url={char.url}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>제출</button>
    </section>
  );
};

export default Selected;
