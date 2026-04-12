import styles from "./selected.module.css";
import CharacterCard from "../characterCard/characterCard";
import { SelectedCandidate, VoteMethod } from "../../types/vote";
import api from "../../service/axios";
import { Dispatch, SetStateAction } from "react";

interface SelectedProps {
  voteId: string;
  voteMethod: VoteMethod;
  selection: SelectedCandidate[];
  setSelection: Dispatch<SetStateAction<SelectedCandidate[]>>;
}

const scoreGroups = [
  { className: styles.score3, range: [0, 1] },
  { className: styles.score2, range: [1, 3] },
  { className: styles.score1, range: [3, 6] },
];

const Selected = ({
  voteId,
  voteMethod,
  selection,
  setSelection,
}: SelectedProps) => {
  // const { user } = useAuth();
  const handleSubmit = async () => {
    const formData = {
      voteId,
      candidateIds: selection.map((candidate) => candidate.id),
    };
    // const response = await api.post(`/vote/submit`, formData);
    console.log(selection, formData, voteMethod[6]);
    // console.log(response);
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
                selection={selection}
                setSelection={setSelection}
              />
            ))}
          </div>
        ))}
      </div>
      {Number(voteMethod[6]) === selection.length && (
        <button onClick={handleSubmit}>제출</button>
      )}
    </section>
  );
};

export default Selected;
